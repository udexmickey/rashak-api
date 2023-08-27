import { MailerService } from '@nestjs-modules/mailer';
import { HttpException, Injectable } from '@nestjs/common';
import { MailConfirmation, NewsLetter } from './mail.dto';

@Injectable()
export class MailsService {
  constructor(private mailerService: MailerService) {}
  async sendUserConfirmation(user: MailConfirmation, token: string) {
    const url = `example.com/auth/confirm?token=${token}`;

    await this.mailerService.sendMail({
      to: user.email,
      // from: '"Support Team" <support@example.com>', // override default from
      subject: 'Welcome to Nice App! Confirm your Email',
      template: './confirmation', // `.hbs` extension is appended automatically
      context: {
        // ✏️ filling curly brackets with content
        name: user.name,
        url,
      },
    });
  }

  //Todo - send bulk mails
  //send to an email works fine but then i want to add send to multiple emails
  async sendNewsLetterSubscribers(email: any) {
    try {
      const newSub = await this.mailerService.sendMail({
        from: 'dimgbamicheal@ymail.com',
        to: `${email}`,
        replyTo: `${email}`,
        subject: 'NewsLetter Topic ✔', // Subject line
        text: 'NewsLetter in plain text', // plain text body
        html: `<b>NewsLetter in html tag</b>`,
      });

      return {
        message: 'Thank You for subscribing to our newsletter',
        data: newSub,
      };
    } catch (error) {
      throw new HttpException(error.message, error.statusCode || 500);
    }
  }
}
