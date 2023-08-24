import { Injectable } from '@nestjs/common';
import { CreateBoardmemberDto } from './dto/create-boardmember.dto';
import { UpdateBoardmemberDto } from './dto/update-boardmember.dto';
import { Repository } from 'typeorm';
import { Boardmember } from './entities/boardmember.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class BoardmembersService {
  constructor(
    @InjectRepository(Boardmember)
    private boardmemberRepo: Repository<Boardmember>,
  ) {}
  async create(createBoardmemberDto: CreateBoardmemberDto) {
    const newBoardmember = this.boardmemberRepo.create(createBoardmemberDto);
    return await this.boardmemberRepo.save(newBoardmember);
  }

  async findAll() {
    const allBoardmember = await this.boardmemberRepo.find();
    return allBoardmember;
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
