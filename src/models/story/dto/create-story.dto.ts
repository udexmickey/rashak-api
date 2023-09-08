import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';
import { Url } from 'url';

export class CreateStoryDto {
  @ApiProperty({ type: 'string', format: 'string' })
  @IsString()
  @IsOptional()
  storyId?: string;

  @ApiPropertyOptional({ type: 'string', format: 'string' })
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
  @IsOptional()
  youtube_link?: string | Url;
}
