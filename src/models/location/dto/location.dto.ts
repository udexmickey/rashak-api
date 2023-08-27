import { Exclude, Expose } from 'class-transformer';

export class LocationDto {
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
