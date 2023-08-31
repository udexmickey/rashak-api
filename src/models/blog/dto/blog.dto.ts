import { Exclude, Expose } from 'class-transformer';

export class BlogDto {
  @Expose()
  image: string;

  @Expose()
  title: string;

  @Expose()
  content: string;

  @Expose()
  author: string;

  @Expose()
  blogId?: string;

  @Expose()
  message: string;

  @Expose()
  readTime: string;

  @Expose()
  createdAt: Date;

  @Expose()
  updatedAt: Date;

  @Expose()
  __v: string;

  @Exclude()
  _id: string;
}
