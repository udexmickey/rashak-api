import {
  IsString,
  IsEnum,
  MinLength,
  IsEmail,
  IsOptional,
} from 'class-validator';
import { DepartmentEnum } from 'src/utils/Enum/department.enum';

export class CreateAuthDto {
  @IsString()
  @IsOptional()
  adminId: string;

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
