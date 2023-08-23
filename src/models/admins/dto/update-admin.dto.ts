import { IsString } from 'class-validator';

export class UpdateAdminDto {
  @IsString()
  fullName: string;
}
