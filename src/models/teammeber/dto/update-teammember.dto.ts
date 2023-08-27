import { PartialType } from '@nestjs/mapped-types';
import { CreateTeamMemberDto } from './create-teammember.dto';

export class UpdateTeamMemberDto extends PartialType(CreateTeamMemberDto) {}
