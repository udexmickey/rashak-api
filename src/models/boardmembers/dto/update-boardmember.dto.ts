import { PartialType } from '@nestjs/mapped-types';
import { CreateBoardmemberDto } from './create-boardmember.dto';

export class UpdateBoardmemberDto extends PartialType(CreateBoardmemberDto) {}
