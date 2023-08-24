import { Exclude, Expose } from 'class-transformer';

export class StoryDto {
  @Expose()
  image: string;

  @Expose()
  title: string;

  @Expose()
  content: string;

  @Expose()
  youtube_link?: string;

  @Expose()
  storyId: string;

  @Expose()
  message: string;

  @Expose()
  createdAt: Date;

  @Expose()
  updatedAt: Date;

  @Exclude()
  _id: string;
}
