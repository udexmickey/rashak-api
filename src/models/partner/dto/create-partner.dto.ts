import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';
import { Url } from 'url';

export class CreatePartnerDto {
  @ApiProperty({ type: 'string', format: 'string' })
  @IsString()
  @IsOptional()
  partnerId?: string;

  @ApiProperty({ type: 'string', format: 'string' })
  @IsString()
  companyName: string;

  @ApiPropertyOptional({ type: 'string', format: 'string' })
  @IsString()
  @IsOptional()
  image?: string | Url;
}
