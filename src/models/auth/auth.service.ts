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
import { ChangePasswordDto } from './dto/change-password.dto';
import { Admin } from '../admins/entities/admin.entity';

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
      const payload = { ...body, adminId, password: hashPassword };

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
      throw new HttpException(error.message, error.statusCode || 500);
    }
  }

  async signIn(body: LoginDto, response: Response) {
    try {
      //validate Admin Login Payload with require payload/dto
      const admin = await this.validateAdminLoginPayload(body);

      //SignIn Jwt with AdminId and also store them in the hearder cookie
      const access_token = await this.signJwtToken(
        admin.adminId,
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
      throw new HttpException(error.message, error.statusCode || 500);
    }
  }

  async logout(response: Response) {
    try {
      //make sure the passed in string is the
      //correct name you used to store the cookie
      response.clearCookie('accessKeyToken');
      //Clear the cookies to logout

      return {
        message: `You have successfully logged out, We hope to see you back soon`,
      };
    } catch (error) {
      throw new HttpException(error.message, error.statusCode || 500);
    }
  }

  //Todo add Forget password function
  async forgetPassword(updateAdminDto: LoginDto) {
    const findEmail = await this.adminService.findEmail(updateAdminDto.email);
    if (!findEmail)
      throw new BadGatewayException('Invalid credentials').getResponse();
    //Todo send a (token) with link to their correct provided email for then to generate new password

    // const sendPassword = await this.mailsService.sendNewsLetterSubscribers(
    //   findEmail.email,
    // );

    return {
      //Todo After getting to work
      //send it to the auth endpoint, where
      //it will be consummed as part of the authentication process
      message: 'TODO: currently under construction',
    };
  }

  async changePassword(admin: Admin, newPassword: ChangePasswordDto) {
    //Fisrt you'll have to be logged in for this to work
    try {
      //1. compare old password with the hashed password of the logged in admin
      const recoverOldPassword = await bcrypt.compare(
        newPassword.oldPassword,
        admin.password,
      );

      //2. if old password don't match with the hashed password of the logged in admin
      //throw an unauthorized Exception / Error
      if (!recoverOldPassword)
        throw new UnauthorizedException('Incorrect Password').getResponse();

      //3. Hash the new password
      const saltRounds = +this.configService.get<number>('SALTROUNDS');
      const hashedNewPassword = await bcrypt.hash(
        newPassword.newPassword,
        saltRounds,
      );

      //4. Assign/Update the new Password to the admin password property
      //which new now be the new password
      Object.assign(admin, {
        ...admin,
        password: hashedNewPassword,
      });

      //5. Save the new password as now the password of the logged in admin
      //this means it was successful
      await this.adminService.changePassword(admin);

      return {
        //Just return a message when the operation above was run successfully
        message: 'You Password was changed successfully',
      };
    } catch (error) {
      //throw error if any error was detected all any point while run the operation/function/logic above
      throw new HttpException(error.message, error.statusCode || 500);
    }
  }
}
