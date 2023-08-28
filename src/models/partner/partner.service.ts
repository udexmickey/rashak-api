import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { CreatePartnerDto } from './dto/create-partner.dto';
import { UpdatePartnerDto } from './dto/update-partner.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Partner } from './entities/partner.entity';
import { Repository } from 'typeorm';
import { v4 as uuid } from 'uuid';

@Injectable()
export class PartnerService {
  constructor(
    @InjectRepository(Partner) private partnerRepo: Repository<Partner>,
  ) {}
  async create(createPartnerDto: CreatePartnerDto) {
    try {
      const partnerId = uuid();
      const payload = { ...createPartnerDto, partnerId };
      const body = this.partnerRepo.create(payload);
      const newPartner = await this.partnerRepo.save(body);
      return newPartner;
    } catch (error) {
      throw new HttpException(error.message, error.statusCode || 500);
    }
  }

  async findAll() {
    try {
      const getAll = await this.partnerRepo.find();
      if (getAll.length < 1) throw new NotFoundException().getResponse();
      return getAll.reverse();
    } catch (error) {
      throw new HttpException(error.message, error.statusCode || 500);
    }
  }

  async findOne(id: string) {
    const findPartner = await this.partnerRepo.findOneBy({ partnerId: id });
    if (!findPartner)
      throw new NotFoundException(
        `Partner with id "${id}" not found`,
      ).getResponse();
    return findPartner;
  }

  async update(id: string, updatePartnerDto: UpdatePartnerDto) {
    try {
      const findPartner = await this.findOne(id);
      const partner = Object.assign(findPartner, updatePartnerDto);
      return await this.partnerRepo.save(partner);
    } catch (error) {
      throw new HttpException(error.message, error.statusCode || 500);
    }
  }

  async remove(id: string) {
    try {
      const findPartner = await this.findOne(id);
      const deletePartner = await this.partnerRepo.remove(findPartner);
      return {
        ...deletePartner,
        message: `Partner (${findPartner.companyName}) removed`,
      };
    } catch (error) {
      throw new HttpException(error.message, error.statusCode || 500);
    }
  }
}
