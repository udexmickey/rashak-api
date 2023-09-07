import { Body, Controller, Post } from '@nestjs/common';
import { MailsService } from './mails.service';
import {
  ContactUsTestDto,
  MailReceiveTestDto,
  MailSendTestDto,
} from './mail.dto';

@Controller('mails')
export class MailsController {
  constructor(private readonly mailService: MailsService) {}

  @Post('mailer')
  async sendMail(@Body() payload: any) {
    const sender = await this.mailService.sendNewsLetterSubscribers(
      payload.subEmail,
      payload.projectOwnerEmail,
    );
    return sender;
  }

  @Post('send')
  async sendMessageSenderMail(@Body() mailPayload: MailSendTestDto) {
    return await this.mailService.sendMessageSenderMail(mailPayload);
  }

  @Post('welcome')
  async Sendmail(@Body() mailPayload: MailSendTestDto) {
    const res = await this.mailService.sendSubMail(mailPayload);
    return res;
  }

  @Post('receive')
  async sendMessageReceiverMail(@Body() mailPayload: MailReceiveTestDto) {
    const res = await this.mailService.sendMessageReceiverMail(mailPayload);
    return res;
  }

  //Still in test phase
  @Post('contactus')
  async contactUs(@Body() mailPayload: ContactUsTestDto) {
    const res = await this.mailService.ContactUsMailService(mailPayload);
    return res;
  }

  @Post('newsletter')
  async NewsLetter(@Body() mailPayload: { email: any }) {
    console.log('====================================');
    console.log('mailPayload.email', mailPayload.email);
    console.log('====================================');
    const res = await this.mailService.NewsLetterMailService(mailPayload.email);
    return res;
  }
}
