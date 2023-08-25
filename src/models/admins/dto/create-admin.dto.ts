import {
  IsEmail,
  IsEnum,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';
import { DepartmentEnum } from 'src/utils/Enum/department.enum';

export class CreateAdminDto {
  @IsString()
  @IsOptional()
  adminId?: string;

  @IsEmail()
  email: string;

  @IsString()
  @MinLength(8, { message: 'Password should be atleast 8 character long' })
  password: string;

  @IsString()
  fullName: string;

  @IsEnum(DepartmentEnum)
  department: DepartmentEnum;
}
