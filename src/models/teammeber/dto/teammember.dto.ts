import { Exclude, Expose } from 'class-transformer';
import { ObjectId } from 'mongodb';

export class Boardmember {
  @Expose()
  teamMemberId: string;

  @Expose()
  image: string;

  @Expose()
  name: string;

  @Expose()
  role: string;

  @Expose()
  createdAt: string;

  @Expose()
  updatedAt: string;

  @Exclude()
  _id: ObjectId | string;
}
