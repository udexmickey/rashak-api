import { Exclude, Expose } from 'class-transformer';

export class StoryDto {
  @Expose()
  communities: string[];

  @Expose()
  state: string;

  @Expose()
  locationId: string;

  @Expose()
  message: string;

  @Expose()
  createdAt: Date;

  @Expose()
  updatedAt: Date;

  @Exclude()
  _id: string;
}
