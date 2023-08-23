import { Exclude, Expose } from 'class-transformer';

export class AdminDto {
  //Exposed details in the response payload
  @Expose()
  email: string;

  @Expose()
  fullName: string;

  @Expose()
  department: string;

  @Expose()
  id: string;

  @Expose()
  createdAt: Date;

  @Expose()
  updatedAt: Date;

  @Expose()
  message: string;

  //am only exposing the authorization cause i'll be passing it to the header
  @Expose()
  authorization: Record<string, any>;

  //
  //Exclude/hide details in the response payload
  @Exclude()
  password: string;

  @Exclude()
  _id: string;
}
