import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { DepartmentEnum } from '../Enum/department.enum';
import { Department_KEY } from '../Decorators/department.decorator';

@Injectable()
export class DepartmentGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredDepartment = this.reflector.getAllAndOverride<
      DepartmentEnum[]
    >(Department_KEY, [context.getHandler(), context.getClass()]);

    //This line returns true if the guard was used globally but not specified on a route/controller
    if (!requiredDepartment) {
      return true;
    }

    const { user } = context.switchToHttp().getRequest();
    const isIT = requiredDepartment.some((role) => {
      return user?.department?.includes(role);
    });

    //Throw new error if the department is not an I.T department
    if (!isIT)
      throw new UnauthorizedException(
        `You are not Authorized, kindly contact the I.T Department`,
      );

    return isIT;
  }
}
