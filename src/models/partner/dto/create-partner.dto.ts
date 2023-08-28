import { IsOptional, IsString } from 'class-validator';
import { Url } from 'url';

export class CreatePartnerDto {
  @IsString()
  @IsOptional()
  partnerId?: string;

  @IsString()
  companyName: string;

  @IsString()
  @IsOptional()
  image?: string | Url;
}
