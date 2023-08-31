import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateBoardmemberDto } from './dto/create-boardmember.dto';
import { UpdateBoardmemberDto } from './dto/update-boardmember.dto';
import { Repository } from 'typeorm';
import { Boardmember } from './entities/boardmember.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { v4 as uuid } from 'uuid';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';

@Injectable()
export class BoardmembersService {
  constructor(
    @InjectRepository(Boardmember)
    private boardmemberRepo: Repository<Boardmember>,
    private cloudinaryService: CloudinaryService,
  ) {}
  async create(
    filename: Express.Multer.File,
    createBoardmemberDto: CreateBoardmemberDto,
  ) {
    try {
      const boardmemberId = uuid();
      const image = await this.cloudinaryService.uploadImage(
        filename,
        'BoardMember Folder',
      );
      const payload = {
        ...createBoardmemberDto,
        boardmemberId,
        image: image.secure_url,
      };
      // const payload = { ...createBoardmemberDto, boardmemberId };
      const newBoardmember = this.boardmemberRepo.create(payload);
      return await this.boardmemberRepo.save(newBoardmember);
    } catch (error) {
      throw new HttpException(error.message, error.statusCode ?? 500);
    }
  }

  async findAll() {
    try {
      const allBoardmembers = await this.boardmemberRepo.find();
      return allBoardmembers.reverse();
    } catch (error) {
      throw new HttpException(error.message, error.statusCode ?? 500);
    }
  }

  async findOne(id: string) {
    const findBoardMember = await this.boardmemberRepo.findOneBy({
      boardmemberId: id,
    });
    if (!findBoardMember)
      throw new NotFoundException('Boardmember not found').getResponse();
    return findBoardMember;
  }

  async update(id: string, updateBoardmemberDto: UpdateBoardmemberDto) {
    try {
      const findBoardMember = await this.findOne(id);
      const boardmember = Object.assign(findBoardMember, updateBoardmemberDto);
      const updateBoardmember = await this.boardmemberRepo.save(boardmember);
      return updateBoardmember;
    } catch (error) {
      throw new HttpException(error.message, error.statusCode ?? 500);
    }
  }

  async remove(id: string) {
    try {
      const findBoardMember = await this.findOne(id);
      const deletedBoardMember = await this.boardmemberRepo.remove(
        findBoardMember,
      );
      return {
        deletedBoardMember,
        message: `${findBoardMember.name} was removed from the board`,
      };
    } catch (error) {
      throw new HttpException(error.message, error.statusCode ?? 500);
    }
  }
}
