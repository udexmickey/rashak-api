import {
  Controller,
  Post,
  Body,
  Res,
  Get,
  UseInterceptors,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';
import { AdminDto } from './dto/admin.dto';
import { SerializeResponse } from 'src/utils/Decorators/serializer.decorator';
import { Response } from 'express';
import { CurrentAdmin } from 'src/utils/Decorators/current-admin.decorator';
import { Admin } from '../admins/entities/admin.entity';
import { NoAuth } from 'src/utils/Decorators/noAuth.decorator';
import { CurrentUserInterceptor } from './interceptors/current-admin.interceptor';

@Controller('auth')
//This is the controlling the response payload
//so if you want to get property the expose it in the dto/AdminDto
@SerializeResponse(AdminDto)
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @NoAuth() // remove authentication guards on those controllers
  //The @NoAuth decorator tracks if the route/controller/header have no-auth
  //on it, then procceed to remove authentication guards on those controllers
  @Post('signup')
  AuthRegister(
    @Body() createAuthDto: CreateAuthDto,
    @Res({ passthrough: true }) response: Response,
  ) {
    return this.authService.signUp(createAuthDto, response);
  }

  @NoAuth()
  @Post('signin')
  AuthLogin(
    @Body() loginPayload: LoginDto,
    @Res({ passthrough: true }) response: Response,
  ) {
    return this.authService.signIn(loginPayload, response);
  }

  @Post('/logout')
  AuthLogout(@Res({ passthrough: true }) response: Response) {
    return this.authService.logout(response);
  }

  //This route have an interceptor(CurrentUserInterceptor) and
  //decorator(@CurrentAdmin())
  //then it returns the current logged in user from the header
  @Get('/profile')
  //to set a guard on a particular route/controller
  //probably you don't want the global guard settings
  //then uncomment the line below 👇👇👇
  // @UseGuards(JwtAuthGuard)
  @UseInterceptors(CurrentUserInterceptor)
  currentUser(@CurrentAdmin() admin: Admin) {
    return admin;
  }
}
