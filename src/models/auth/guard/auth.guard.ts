import {
  CanActivate,
  ExecutionContext,
  HttpException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { ConfigService } from '@nestjs/config';
import { Reflector } from '@nestjs/core';
import { IS_PUBLIC_KEY } from 'src/utils/Decorators/auth.decorator';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private config: ConfigService,
    private reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext) {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isPublic) {
      // 💡 See this condition
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);

    //This two lines on helps to check if the metadata have no-auth
    //then unvalidates the guard/authentication on that particular route
    //using the @noAuth decorator
    const noAuth = this.reflector.get<boolean>('no-auth', context.getHandler());
    if (noAuth) return true;

    const { cookies } = request;

    try {
      if (!token) {
        throw new UnauthorizedException('no token').getResponse();
      }

      //if token is undefined/null return 401
      if (!cookies || !cookies?.accessKeyToken) {
        throw new UnauthorizedException().getResponse();
      }
      //this line helps to get the jwt token key from the header
      //then verify if that token is still alive/valid
      //then allow access to the route else throws an error/exceptions
      const payload = await this.jwtService.verifyAsync(token, {
        secret: this.config.get<string>('JWT_SECRET'),
      });
      // 💡 We're assigning the payload to the request object here
      // so that we can access it in our route handlers
      request['user'] = payload;
    } catch (error) {
      // throw new HttpException(error.message, error.statusCode ?? 500);
      throw new UnauthorizedException();
    }
    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
