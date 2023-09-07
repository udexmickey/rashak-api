import { MailerService } from '@nestjs-modules/mailer';
import { HttpException, Injectable } from '@nestjs/common';
import { MailConfirmation } from './mail.dto';

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
  async sendNewsLetterSubscribers(subEmail: string, projectOwnerEmail: string) {
    try {
      const newSub = await this.mailerService.sendMail({
        from: projectOwnerEmail,
        to: `${subEmail}`,
        replyTo: `${subEmail}`,
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

  //
  ///
  async sendSubMail({
    subEmail,
    projectOwnerEmail,
    subjectEmail,
    appName,
    name,
  }) {
    try {
      const mailRespond = await this.mailerService.sendMail({
        to: subEmail,
        from: projectOwnerEmail,
        subject: subjectEmail,

        template: './newSubscriber',
        context: { appName, name },
      });
      return mailRespond;
    } catch (err) {
      return { msg: `${err}` };
    }
  }

  async sendMessageSenderMail({
    subEmail,
    projectOwnerEmail,
    subjectEmail,
    appName,
    name,
  }) {
    try {
      await this.mailerService.sendMail({
        to: subEmail,
        from: projectOwnerEmail,
        subject: subjectEmail,

        template: './messageSender',
        context: { appName, name },
      });
    } catch (err) {
      throw new HttpException(err.message, err.statusCode || 500);
    }
  }

  async sendMessageReceiverMail({
    subEmail,
    projectOwnerEmail,
    subjectEmail,
    appName,
    adminName,
    body,
    phoneNumber,
    name,
  }) {
    try {
      const receiverResponse = await this.mailerService.sendMail({
        to: subEmail,
        from: projectOwnerEmail,
        subject: subjectEmail,

        template: './messageReceiver',
        context: { appName, adminName, body, phoneNumber, name },
      });
      return receiverResponse;
    } catch (err) {
      throw new HttpException(err.message, err.statusCode || 500);
    }
  }

  // The service function responsible for receiving and sending back response via email after filling contact us form
  async ContactUsMailService({ subEmail, body, name, phoneNumber }) {
    //TODO - Add nestjs @event emitter to the saas service, third party like each nodemailer request
    try {
      const feedBackMail = await this.sendMessageSenderMail({
        subEmail,
        projectOwnerEmail: 'dimgbamicheal@ymail.com',
        subjectEmail: 'Contact us',
        appName: 'Rashak',
        name,
      });

      const receiverForm = await this.sendMessageReceiverMail({
        subEmail: 'dimgbamicheal@ymail.com',
        projectOwnerEmail: 'dimgbamicheal@ymail.com',
        subjectEmail: 'Contact us',
        appName: 'Rashak',
        adminName: 'HR/Management',
        name,
        body: body,
        phoneNumber,
      });

      return {
        receiverForm: receiverForm,
        feedBackMail: feedBackMail,
        message: 'Thanks for contacting us',
      };
    } catch (err) {
      throw new HttpException(err.message, err.statusCode || 500);
    }
  }

  // The service function responsible for newsletter Subscribers
  async NewsLetterMailService(subEmail: string) {
    try {
      const feedBackMail = await this.sendSubMail({
        subEmail,
        projectOwnerEmail: 'dimgbamicheal@ymail.com',
        subjectEmail: 'NewsLetter Subscription',
        appName: 'Rashak',
        name: subEmail,
      });

      const receiverForm = await this.sendMessageReceiverMail({
        subEmail: 'dimgbamicheal@ymail.com',
        projectOwnerEmail: 'dimgbamicheal@ymail.com',
        subjectEmail: 'New NewsLetter Subscriber',
        appName: 'Rashak',
        adminName: 'Rashak Management',
        body: 'We just got a new subscriber',
        phoneNumber: null,
        name,
      });

      return {
        receiverForm: receiverForm,
        feedBackMail: feedBackMail,
        message:
          "Thanks for subscribing to our news letter, you'll be the first to know about our new products/services",
      };
    } catch (err) {
      throw new HttpException(err.message, err.statusCode || 500);
    }
  }
}
