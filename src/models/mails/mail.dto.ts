import { IsArray, IsEmail, IsPhoneNumber, IsString } from 'class-validator';

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

export class MailSendTestDto {
  @IsArray()
  subEmail: string[];

  @IsEmail()
  projectOwnerEmail: string;

  @IsString()
  subjectEmail: string;

  @IsString()
  appName: string;

  @IsString()
  name: string;
}

export class MailReceiveTestDto {
  @IsArray()
  subEmail: string[];

  @IsEmail()
  projectOwnerEmail: string;

  @IsString()
  subjectEmail: string;

  @IsString()
  appName: string;

  @IsString()
  adminName: string;

  @IsString()
  body: string;

  @IsPhoneNumber()
  phoneNumber: any;

  @IsString()
  name: string;
}

export class ContactUsTestDto {
  @IsArray()
  subEmail: string;

  @IsString()
  body: string;

  @IsString()
  name: string;

  @IsPhoneNumber()
  phoneNumber: any;
}
