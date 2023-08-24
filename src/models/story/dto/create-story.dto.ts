import { IsOptional, IsString } from 'class-validator';
import { Url } from 'url';

export class CreateStoryDto {
  @IsString()
  @IsOptional()
  storyId?: string;

  @IsString()
  image: string | Url;

  @IsString()
  title: string;

  @IsString()
  content: string;

  @IsString()
  youtube_link?: string | Url;
}
