import { IsOptional, IsString } from 'class-validator';

export class CreateBoardmemberDto {
  @IsString()
  @IsOptional()
  boardmemberId?: string;

  @IsString()
  image: string;

  @IsString()
  name: string;

  @IsString()
  role: string;
}
