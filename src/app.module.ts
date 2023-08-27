import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BoardmembersModule } from './models/boardmembers/boardmembers.module';
import { AdminsModule } from './models/admins/admins.module';
import { AuthModule } from './models/auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './config/database.module';
import configuration from './config/configuration';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';
import { StoryModule } from './models/story/story.module';
import { MailsModule } from './models/mails/mails.module';
import { TeamMemberModule } from './models/teammeber/teammember.module';

@Module({
  imports: [
    //This line helps nest understand the proccess.env.path_name
    //or the configService provided by nest for environment
    ConfigModule.forRoot({
      envFilePath: ['.env.development', '.env'],
      isGlobal: true,
      load: [configuration],
    }),

    //Everything relating to database injection
    DatabaseModule,

    //The Throttler helps to prevent multiple api calls within a period of time(ttl)
    ThrottlerModule.forRoot({
      ttl: 10, //10 seconds
      limit: 5, //5 (times) i.e 5 request within 10 seconds
    }),
    //The above will set the global options for the ttl, the time to live, and the limit,
    //the maximum number of requests within the ttl, for the routes of your application that are guarded.

    BoardmembersModule,
    AdminsModule,
    AuthModule,
    StoryModule,
    MailsModule,
    TeamMemberModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule {}
