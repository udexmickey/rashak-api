import {
  CallHandler,
  ExecutionContext,
  HttpException,
  Injectable,
  NestInterceptor,
  UnprocessableEntityException,
} from '@nestjs/common';
import { AdminsService } from 'src/models/admins/admins.service';

@Injectable()
export class CurrentUserInterceptor implements NestInterceptor {
  constructor(private adminService: AdminsService) {}
  async intercept(context: ExecutionContext, next: CallHandler) {
    const request = context.switchToHttp().getRequest();

    try {
      const { user } = request;
      const { id } = user;

      if (!id)
        throw new UnprocessableEntityException(
          'Login and try again',
        ).getResponse();

      if (id) {
        const activeAdmin = await this.adminService.findOne(id);
        request.currentAdmin = activeAdmin;
      }

      return next.handle();
    } catch (error) {
      throw new HttpException(error.message, error.statusCode ?? 500);
    }
  }
}
