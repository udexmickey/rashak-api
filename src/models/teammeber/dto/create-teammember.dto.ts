import { IsOptional, IsString } from 'class-validator';

export class CreateTeamMemberDto {
  @IsString()
  @IsOptional()
  teamMemberId?: string;

  @IsString()
  @IsOptional()
  image?: string;

  @IsString()
  name: string;

  @IsString()
  role: string;
}
