import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { AdminsModule } from '../admins/admins.module';
import { JwtModule } from '@nestjs/jwt';
import { APP_GUARD } from '@nestjs/core';
import { PassportModule } from '@nestjs/passport';
import { ConfigService } from '@nestjs/config';
import { AuthGuard } from './guard/auth.guard';
import { JWTStrategy } from './strategy/jwt.strategy';
import { CurrentUserInterceptor } from './interceptors/current-admin.interceptor';

@Module({
  // imports: [
  //   PassportModule,
  //   JwtModule.registerAsync({
  //     inject: [ConfigService],
  //     useFactory: async (config: ConfigService) => ({
  //       secret: (() => {
  //         // console.log('jwtConstants.secret', jwtConstants.secret);
  //         // console.log('config', config.get<string>('JWT_SECRET'));
  //         return config.get<string>('JWT_SECRET');
  //       })(),
  //       //This sets expiration time for jwt after login/signup
  //       //The expiresIn currently have a 10 minute validation/authenticated time
  //       signOptions: { expiresIn: '60' },
  //     }),
  //   }),
  //   AdminsModule,
  // ],

  imports: [
    AdminsModule,
    PassportModule,
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => ({
        secret: config.get<string>('JWT_SECRET'),
        //This sets expiration time for jwt after login/signup
        signOptions: { expiresIn: config.get<string>('jwtExpiresTime') },
        // signOptions: { expiresIn: config.get<string>('jwtExpiresTime') },
      }),
    }),
  ],

  controllers: [AuthController],
  providers: [
    AuthService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
      // useExisting: JWTStrategy,
    },
    AuthGuard,
    CurrentUserInterceptor,
    JWTStrategy,
  ],
  exports: [CurrentUserInterceptor],
})
export class AuthModule {}
