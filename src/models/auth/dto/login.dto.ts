import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class LoginDto {
  @ApiProperty({
    description: 'enter your unique email address',
    example: 'johndoe@yahoo.com',
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    description: 'enter a valid password',
    example: 'Password',
  })
  @IsNotEmpty()
  @IsString()
  password: string;
}

export class AuthLoginResponse {
  @ApiProperty({
    example: 'Welcome back @johndoe@yahoo.com',
  })
  message: string;
  authorisation: {
    access_token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NDRkNThkNTZiNDNlOGE1ZTgyMjg4OGQiLCJuYW1lIjoibWlrZSIsInR5cGUiOiJhZG1pbiIsImlhdCI6MTY4NDQyMjY3OSwiZXhwIjoxNjg0NTA5MDc5fQ.Mfgd77mBKN9Oej6jEql8a3WLNl7CwHnj97Lm_u3mxyE';
    type: 'Bearer';
  };
}
