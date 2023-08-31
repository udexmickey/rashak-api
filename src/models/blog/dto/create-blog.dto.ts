import { IsOptional, IsString } from 'class-validator';
import { Url } from 'url';

export class CreateBlogDto {
  @IsString()
  @IsOptional()
  blogId?: string; //i only have this as optional cause it would be generated automatical from uuid

  @IsString()
  @IsOptional()
  image: string | Url;

  @IsString()
  title: string;

  @IsString()
  content: string;

  @IsString()
  author: string;

  @IsOptional()
  readTime?: string | number; //the readTime will not be stored just small calculation based on string lenght to help readers evaluate the time it will take them to read the blog
}
