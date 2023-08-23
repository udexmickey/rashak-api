import {
  BadGatewayException,
  HttpException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateAuthDto } from './dto/signup.dto';
import { AdminsService } from '../admins/admins.service';
import { v4 as uuid } from 'uuid';
import * as bcrypt from 'bcrypt';
import { LoginDto } from './dto/login.dto';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';
import { DepartmentEnum } from 'src/utils/Enum/department.enum';

@Injectable()
export class AuthService {
  constructor(
    private adminService: AdminsService,
    private configService: ConfigService,
    private jwtService: JwtService,
  ) {}

  async validateAdminLoginPayload(admin: LoginDto) {
    //validate check for correct email and password and return error if any
    const findAdmin = await this.adminService.findEmail(admin.email);

    if (!findAdmin)
      throw new BadGatewayException('Invalid credentials').getResponse();
    const unHashedPassword = await bcrypt.compare(
      admin.password,
      findAdmin.password,
    );
    if (!unHashedPassword)
      throw new UnauthorizedException('Invalid credentials').getResponse();
    return findAdmin;
  }

  async signJwtToken(
    adminId: string,
    department: DepartmentEnum,
    response: Response,
  ) {
    //SignIn the JWT token with the id
    const JwtToken = await this.jwtService.signAsync({
      id: adminId,
      department: department,
    });

    if (!JwtToken)
      throw new BadGatewayException('Jwt Token not avaliable for signup');

    //This line of code below sets the token in the cookie
    response.cookie('accessKeyToken', JwtToken, { httpOnly: true });
    return JwtToken;
  }

  async signUp(body: CreateAuthDto, response: Response) {
    const adminId = uuid();
    try {
      const admin = await this.adminService.findEmail(body.email);
      if (admin)
        throw new UnauthorizedException(
          'Email already exist in the db',
        ).getResponse();
      //the new instaince of configService from
      //@nestjs/config is same as proccess.env.SALTROUNDS
      const saltRounds = +this.configService.get<number>('SALTROUNDS');
      const hashPassword = await bcrypt.hash(body.password, saltRounds);
      const payload = { ...body, id: adminId, password: hashPassword };

      //
      const access_token = await this.signJwtToken(
        adminId,
        body.department,
        response,
      );
      //If now error then create a new Admin
      await this.adminService.create(payload);
      //onSuccess return the new admin and access_token
      // return { ...newAdmin, access_token };
      return {
        message: 'Registration successfully',
        authorization: {
          access_token,
          type: 'Bearer',
        },
      };
    } catch (error) {
      throw new HttpException(error.message, error.statusCode);
    }
  }

  async signIn(body: LoginDto, response: Response) {
    try {
      //validate Admin Login Payload with require payload/dto
      const admin = await this.validateAdminLoginPayload(body);

      //SignIn Jwt with AdminId and also store them in the hearder cookie
      const access_token = await this.signJwtToken(
        admin.id,
        admin.department,
        response,
      );
      // return { ...admin, access_token };
      return {
        message: 'Logged in successfully',
        authorization: {
          access_token,
          type: 'Bearer',
        },
      };
    } catch (error) {
      throw new HttpException(error.message, error.statusCode);
    }
  }

  async logout(response: Response) {
    //make sure the passed in string is the
    //correct name you used to store the cookie
    response.clearCookie('accessKeyToken');
    //Clear the cookies to logout

    return {
      message: `You have successfully logged out, We hope to see you back soon`,
    };
  }
}
