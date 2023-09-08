import { ApiPropertyOptional, ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';
import { Url } from 'url';

export class CreateBlogDto {
  @ApiPropertyOptional({ type: 'string', format: 'string' })
  @IsString()
  @IsOptional()
  blogId?: string; //i only have this as optional cause it would be generated automatical from uuid

  @ApiProperty({ type: 'string', format: 'string' })
  @IsString()
  @IsOptional()
  image?: string | Url;

  @ApiProperty({ type: 'string', format: 'string' })
  @IsString()
  title: string;

  @ApiProperty({ type: 'string', format: 'string' })
  @IsString()
  content: string;

  @ApiPropertyOptional({ type: 'string', format: 'string' })
  @IsString()
  author: string;

  @IsOptional()
  readTime?: string | number; //the readTime will not be stored just small calculation based on string lenght to help readers evaluate the time it will take them to read the blog
}
