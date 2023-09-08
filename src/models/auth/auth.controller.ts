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
import { AuthLoginResponse, LoginDto } from './dto/login.dto';
import { AdminDto } from './dto/admin.dto';
import { SerializeResponse } from 'src/utils/Decorators/serializer.decorator';
import { Response } from 'express';
import { CurrentAdmin } from 'src/utils/Decorators/current-admin.decorator';
import { Admin } from '../admins/entities/admin.entity';
import { NoAuth } from 'src/utils/Decorators/noAuth.decorator';
import { CurrentUserInterceptor } from './interceptors/current-admin.interceptor';
import { ChangePasswordDto } from './dto/change-password.dto';
import {
  ApiOperation,
  ApiBody,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiOkResponse,
  ApiTags,
  ApiBadGatewayResponse,
} from '@nestjs/swagger';

@Controller('auth')
//This is the controlling the response payload
//so if you want to get property the expose it in the dto/AdminDto
@ApiTags('Authentication')
@SerializeResponse(AdminDto)
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @NoAuth() // remove authentication guards on those controllers
  //The @NoAuth decorator tracks if the route/controller/header have no-auth
  //on it, then procceed to remove authentication guards on those controllers
  @Post('signup')
  @ApiOperation({
    description: 'Use this to add new user to the database',
    summary: 'Create new user',
  })
  @ApiBody({
    type: CreateAuthDto,
    description: 'Add new user',
  })
  @ApiCreatedResponse({
    description:
      'The user has been successfully created. \n\n After successful signup pass in the token string to the green Authorize box at the top right of the swagger docs to be authorised',
    type: CreateAuthDto,
  })
  @ApiForbiddenResponse({ description: 'Forbidden.' })
  AuthRegister(
    @Body() createAuthDto: CreateAuthDto,
    @Res({ passthrough: true }) response: Response,
  ) {
    return this.authService.signUp(createAuthDto, response);
  }

  @NoAuth()
  @Post('signin')
  @ApiOperation({
    description: 'Use this to Login Authorized user in the database',
    summary: 'Login user',
  })
  @ApiOkResponse({
    description: `Welcome back \n\n After successful login pass in the token string to the green Authorize box at the top right of the swagger docs to be authorised`,
    type: AuthLoginResponse,
  })
  @ApiBadGatewayResponse({
    status: 502,
    description: 'Bad Gateway!, invalid login credentials.',
  })
  @ApiBody({
    type: LoginDto,
    description: 'login with valid credentials',
  })
  AuthLogin(
    @Body() loginPayload: LoginDto,
    @Res({ passthrough: true }) response: Response,
  ) {
    return this.authService.signIn(loginPayload, response);
  }

  @Post('/logout')
  @ApiOperation({
    description: `Logout authenticated user, you don't have to pass in any parameter...`,
    summary: 'Logout',
  })
  @ApiOkResponse({
    description: `You have successfully logged out, We hope to see you back soon`,
  })
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
  @ApiOperation({
    description: 'Use this to get the Current Authorized Logged in user/admin',
    summary: 'Current user/admin',
  })
  @ApiOkResponse({
    description: `Get the logged in user/admin profile`,
    type: Admin,
  })
  @ApiForbiddenResponse({
    status: 401,
    description: 'Unauthorized!, Login and try again',
  })
  @UseInterceptors(CurrentUserInterceptor)
  currentUser(@CurrentAdmin() admin: Admin) {
    return admin;
  }

  //Todo not fully implemented yet
  @Post('/forgetPassword')
  forgetPassword(@Body() body: LoginDto) {
    return this.authService.forgetPassword(body);
  }

  //Todo still in testing mode
  @UseInterceptors(CurrentUserInterceptor)
  @Post('/changepassword')
  AuthChangePassword(
    @CurrentAdmin() admin: Admin,
    @Body() newPassword: ChangePasswordDto,
  ) {
    return this.authService.changePassword(admin, newPassword);
  }
}
