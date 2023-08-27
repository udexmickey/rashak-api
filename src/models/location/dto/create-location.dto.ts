import { IsString, IsOptional, IsArray } from 'class-validator';

export class CreateLocationDto {
  @IsString()
  @IsOptional()
  locationId?: string;

  @IsString()
  state: string;

  @IsArray({ message: 'communities must be an array of string' })
  communities: string[];
}
