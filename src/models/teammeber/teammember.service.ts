import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateTeamMemberDto } from './dto/create-teammember.dto';
import { UpdateTeamMemberDto } from './dto/update-teammember.dto';
import { TeamMember } from './entities/teammember.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { v4 as uuid } from 'uuid';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';

@Injectable()
export class TeamMemberService {
  constructor(
    @InjectRepository(TeamMember)
    private teamMemberRepo: Repository<TeamMember>,
    private cloudinaryService: CloudinaryService,
  ) {}
  async create(
    filename: Express.Multer.File,
    createTeamMemberDto: CreateTeamMemberDto,
  ) {
    try {
      const teamMemberId = uuid();
      const image = await this.cloudinaryService.uploadImage(
        filename,
        'TeamMembers Folder',
      );
      const payload = {
        ...createTeamMemberDto,
        teamMemberId,
        image: image.url,
      };
      const newTeamMember = this.teamMemberRepo.create(payload);
      return await this.teamMemberRepo.save(newTeamMember);
    } catch (error) {
      throw new HttpException(error.message, error.statusCode ?? 500);
    }
  }

  async findAll() {
    try {
      const allTeamMembers = await this.teamMemberRepo.find();
      return allTeamMembers.reverse();
    } catch (error) {
      throw new HttpException(error.message, error.statusCode ?? 500);
    }
  }

  async findOne(id: string) {
    const findTeamMember = await this.teamMemberRepo.findOneBy({
      teamMemberId: id,
    });
    if (!findTeamMember)
      throw new NotFoundException('TeamMember not found').getResponse();
    return findTeamMember;
  }

  async update(id: string, updateTeamMemberDto: UpdateTeamMemberDto) {
    try {
      const findTeamMember = await this.findOne(id);
      const teammember = Object.assign(findTeamMember, updateTeamMemberDto);
      const updateTeamMember = await this.teamMemberRepo.save(teammember);
      return updateTeamMember;
    } catch (error) {
      throw new HttpException(error.message, error.statusCode ?? 500);
    }
  }

  async remove(id: string) {
    try {
      const findTeamMember = await this.findOne(id);
      const deletedTeamMember = await this.teamMemberRepo.remove(
        findTeamMember,
      );
      return {
        deletedTeamMember,
        message: `${findTeamMember.name} was removed from the board`,
      };
    } catch (error) {
      throw new HttpException(error.message, error.statusCode ?? 500);
    }
  }
}
