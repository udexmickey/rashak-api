import {
  BadGatewayException,
  HttpException,
  Injectable,
  NotFoundException,
  // UnauthorizedException,
} from '@nestjs/common';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Admin } from './entities/admin.entity';
import { LoginDto } from '../auth/dto/login.dto';
// import { ObjectId } from 'mongodb';

@Injectable()
export class AdminsService {
  constructor(@InjectRepository(Admin) private repo: Repository<Admin>) {}
  async create(body: CreateAdminDto) {
    return await this.repo.save(body);
  }

  async findEmail(email: string) {
    const adminEmail = await this.repo.findOne({ where: { email } });
    return adminEmail;
  }

  async findAll() {
    const admins = await this.repo.find();
    return admins.reverse();
  }

  async findOne(id: string): Promise<Admin> {
    try {
      const admin = await this.repo.findOneBy(
        //Here i'm using a new instaince of mongodb objectId as my query id
        //which is _id and its differient from id
        // { _id: new ObjectId(id) }, //comment this line if you which to use id from uuid

        //also you can comment the unique _id from mongo and use the id from uuid
        //Which is the normal id string from uuid
        { adminId: id }, //uncomment this line if you which to use id from uuid

        // note: The two id/s is not same one is from mongo and the other is from uuid,
        //but they are both unique and belongs to an admin
      );
      if (!admin) throw new NotFoundException('Admin not found').getResponse();
      return admin;
    } catch (error) {
      throw new HttpException(error.message, error.statusCode || 500);
    }
  }

  async update(id: string, updateAdminDto: UpdateAdminDto): Promise<Admin> {
    try {
      const foundAdmin = await this.findOne(id);

      Object.assign(foundAdmin, updateAdminDto);
      return this.repo.save(foundAdmin);
    } catch (error) {
      throw new HttpException(error.message, error.statusCode || 500);
    }
  }

  async remove(id: string) {
    try {
      const admin = await this.findOne(id);
      return { deletedUser: this.repo.remove(admin), message: 'Admin deleted' };
    } catch (error) {
      throw new HttpException(error.message, error.statusCode || 500);
    }
  }

  //Forgotten Password
  async forgetPassword(updateAdminDto: LoginDto) {
    const findEmail = await this.findEmail(updateAdminDto.email);
    if (!findEmail)
      throw new BadGatewayException('Invalid credentials').getResponse(); //TODO ## Forget password
  }
}
