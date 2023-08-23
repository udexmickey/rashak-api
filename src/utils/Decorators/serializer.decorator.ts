import { UseInterceptors } from '@nestjs/common';
import { SerializerInterceptors } from '../interceptors/serializer.interception';

interface ClassConstructor {
  new (...args: any[]): object;
}

export function SerializeResponse(dto: ClassConstructor) {
  //the interceptors is used to get request before execution and
  //responds after excution of request
  return UseInterceptors(new SerializerInterceptors(dto));
}
