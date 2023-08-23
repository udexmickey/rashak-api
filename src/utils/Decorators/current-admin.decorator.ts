import { ExecutionContext, createParamDecorator } from '@nestjs/common';

export const CurrentAdmin = createParamDecorator(
  (data: never, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest();
    return request.currentAdmin;
  },
);
