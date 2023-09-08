import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';
import { ObjectId } from 'mongodb';

export class Boardmember {
  @Expose()
  boardmemberId: string;

  @ApiProperty({
    description: 'The image will be referenced from cloudinary',
    // example: 'array',
  })
  @Expose()
  image: string;

  @ApiProperty({
    description: 'Name must be a string',
    // example: 'array',
  })
  @Expose()
  name: string;

  @ApiProperty({
    description: 'Every Boardmember should have a single role',
    example: 'CEO',
  })
  @Expose()
  role: string;

  @Expose()
  createdAt: string;

  @Expose()
  updatedAt: string;

  @Exclude()
  _id: ObjectId | string;
}
