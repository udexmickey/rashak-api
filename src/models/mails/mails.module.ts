import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { Global, Module } from '@nestjs/common';
import { MailsService } from './mails.service';
import { join } from 'path';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MailsController } from './mails.controller';

@Global() // 👈 global module
@Module({
  imports: [
    ConfigModule,
    MailerModule.forRootAsync({
      useFactory: async (config: ConfigService) => ({
        transport: {
          host: 'smtp.mail.yahoo.com',
          port: 465,
          secure: false,
          service: 'yahoo',
          SSL: true,
          auth: {
            user: config.get<string>('MAILER_EMAIL'),
            pass: config.get<string>('MAILER_PASSWORD'),
          },
          tls: {
            rejectUnauthorized: false,
          },
          // logger: true,
          // debug: true,
        },
        defaults: {
          from: config.get<string>('MAILER_EMAIL'),
        },
        template: {
          dir: join(__dirname, './templates'),
          adapter: new HandlebarsAdapter(),
          options: {
            strict: true,
          },
        },
      }),
      //To use the config.get<string>('Your_env_string')
      //you'll need to inject the config services👇👇👇
      inject: [ConfigService],
    }),
  ],
  providers: [MailsService, ConfigService],
  exports: [MailsService],
  controllers: [MailsController],
})
export class MailsModule {}
