import { Body, Controller, Post } from '@nestjs/common';
import { MailsService } from './mails.service';
import { NewsLetter } from './mail.dto';

@Controller('mails')
export class MailsController {
  constructor(private readonly mailService: MailsService) {}

  @Post('mailer')
  async sendMail(@Body() payload: NewsLetter) {
    const sender = await this.mailService.sendNewsLetterSubscribers(
      `${payload.email}`,
    );

    return sender;
  }
}
