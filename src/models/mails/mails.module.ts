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
    MailerModule.forRoot({
      transport: {
        host: 'smtp.mail.yahoo.com',
        port: 465,
        secure: true, // upgrade later with STARTTLS
        auth: {
          user: 'dimgbamicheal@ymail.com',
          pass: 'nbzholxhkzioibon',
        },
        // logger: true,
        // debug: true,
      },
      // defaults: {
      //   from: '"nest-modules" <modules@nestjs.com>',
      // },
    }),

    // MailerModule.forRootAsync({
    //   useFactory: () => ({
    //     transport: {
    //       host: 'smtp.mail.yahoo.com',
    //       port: 465,
    //       secure: true,
    //       service: 'yahoo',
    //       auth: {
    //         // // TODO: replace `user` and `pass` values from:
    //         // <https://forwardemail.net/guides/send-email-with-custom-domain-smtp>
    //         user: 'dimgbamicheal@ymail.com',
    //         pass: 'nbzholxhkzioibon',
    //       },
    //       logger: true,
    //       debug: true,
    //     },
    //     // defaults: {
    //     //   from: '"nest-modules" <modules@nestjs.com>',
    //     // },
    //     // template: {
    //     //   // dir: process.cwd() + '/templates/',
    //     //   // adapter: new HandlebarsAdapter(), // or new PugAdapter() or new EjsAdapter()
    //     //   options: {
    //     //     strict: true,
    //     //   },
    //     // },
    //   }),
    // }),
  ],
  providers: [MailsService],
  exports: [MailsService],
  controllers: [MailsController],
})
export class MailsModule {}
