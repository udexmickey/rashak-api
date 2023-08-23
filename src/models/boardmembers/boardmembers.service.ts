import { Injectable } from '@nestjs/common';
import { CreateBoardmemberDto } from './dto/create-boardmember.dto';
import { UpdateBoardmemberDto } from './dto/update-boardmember.dto';

@Injectable()
export class BoardmembersService {
  create(createBoardmemberDto: CreateBoardmemberDto) {
    return 'This action adds a new boardmember';
  }

  findAll() {
    return `This action returns all boardmembers`;
  }

  findOne(id: number) {
    return `This action returns a #${id} boardmember`;
  }

  update(id: number, updateBoardmemberDto: UpdateBoardmemberDto) {
    return `This action updates a #${id} boardmember`;
  }

  remove(id: number) {
    return `This action removes a #${id} boardmember`;
  }
}
