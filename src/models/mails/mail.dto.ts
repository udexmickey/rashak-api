import { IsEmail, IsPhoneNumber, IsString } from 'class-validator';

export class MailConfirmation {
  @IsString()
  name: string;

  @IsEmail()
  email: string[];
}

export class NewsLetter {
  @IsString()
  email: string;
}

export class ContactUs {
  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @IsPhoneNumber()
  phoneNumber: any;

  @IsString()
  message: string;
}
