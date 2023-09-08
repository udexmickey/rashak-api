import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, IsArray } from 'class-validator';

export class CreateLocationDto {
  @ApiProperty({ type: 'string', format: 'string' })
  @IsString()
  @IsOptional()
  locationId?: string;

  @ApiProperty({ type: 'string', format: 'string' })
  @IsString()
  state: string;

  @ApiProperty({ type: 'array', format: 'array' })
  @IsArray({ message: 'communities must be an array of string' })
  communities: string[];
}
