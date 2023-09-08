import { Body, Controller, Post } from '@nestjs/common';
import { MailsService } from './mails.service';
import {
  ContactUsTestDto,
  MailReceiveTestDto,
  MailSendTestDto,
} from './mail.dto';
import {
  ApiBody,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';

@Controller('mails')
@ApiTags('Testing Third Party Services')
export class MailsController {
  constructor(private readonly mailService: MailsService) {}

  @Post('mailer')
  @ApiForbiddenResponse({ description: 'Forbidden.' })
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
  @ApiOperation({
    description: 'Message after succeful signup',
    summary: 'still testing the service',
  })
  async Sendmail(@Body() mailPayload: MailSendTestDto) {
    const res = await this.mailService.sendSubMail(mailPayload);
    return res;
  }

  @Post('receive')
  @ApiOperation({
    description: 'Still in test stage',
    summary: 'still testing the service',
  })
  async sendMessageReceiverMail(@Body() mailPayload: MailReceiveTestDto) {
    const res = await this.mailService.sendMessageReceiverMail(mailPayload);
    return res;
  }

  //Still in test phase
  @Post('contactus')
  @ApiBody({
    type: String,
    description: 'Contact us for any concern you may have.',
  })
  @ApiOperation({
    description: 'Send you concern/issues body ',
    summary: 'Fill contactus form',
  })
  @ApiCreatedResponse({
    description: 'Email was successfully sent',
    type: String,
  })
  async contactUs(@Body() mailPayload: ContactUsTestDto) {
    const res = await this.mailService.ContactUsMailService(mailPayload);
    return res;
  }

  @Post('newsletter')
  @ApiBody({
    type: String,
    description:
      'Subscribe to our newsletter and be the first to know our new products/services',
  })
  @ApiOperation({
    summary: 'Subscribe to our newsletter',
    description: 'Add new Subscriber',
  })
  @ApiCreatedResponse({
    description: 'Email was successfully sent',
    type: String,
  })
  async NewsLetter(@Body() mailPayload: { email: any }) {
    const res = await this.mailService.NewsLetterMailService(mailPayload.email);
    return res;
  }
}
