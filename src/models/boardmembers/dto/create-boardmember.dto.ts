import { IsDateString, IsString } from 'class-validator';

export class CreateBoardmemberDto {
  @IsString()
  _id: string;

  @IsString()
  id: string;

  @IsString()
  image: string;

  @IsString()
  name: string;

  @IsString()
  role: string;

  @IsDateString()
  createdAt: string;

  @IsDateString()
  updatedAt: string;
}
