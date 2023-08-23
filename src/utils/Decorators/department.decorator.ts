import { SetMetadata } from '@nestjs/common';
import { DepartmentEnum } from '../Enum/department.enum';

export const Department_KEY = 'department';
export const Department = (...department: DepartmentEnum[]) =>
  SetMetadata(Department_KEY, department);
