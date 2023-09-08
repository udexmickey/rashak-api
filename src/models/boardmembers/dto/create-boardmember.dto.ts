import { ApiPropertyOptional, ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class CreateBoardmemberDto {
  @ApiPropertyOptional({ type: 'string', format: 'string' })
  @IsString()
  @IsOptional()
  boardmemberId?: string;

  @ApiProperty({ type: 'string', format: 'string' })
  @IsString()
  @IsOptional()
  image?: string;

  @ApiProperty({ type: 'string', format: 'string' })
  @IsString()
  name: string;

  @ApiProperty({ type: 'string', format: 'string' })
  @IsString()
  role: string;
}
