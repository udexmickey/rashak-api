import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateLocationDto } from './dto/create-location.dto';
import { UpdateLocationDto } from './dto/update-location.dto';
import { Location } from './entities/location.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { v4 as uuid } from 'uuid';

@Injectable()
export class LocationService {
  constructor(
    @InjectRepository(Location) private locationRepo: Repository<Location>,
  ) {}
  async create(createLocationDto: CreateLocationDto) {
    try {
      const locationId = uuid();
      const payload = { ...createLocationDto, locationId };
      const addLocation = this.locationRepo.create(payload);
      return await this.locationRepo.save(addLocation);
    } catch (error) {
      throw new HttpException(error.message, error.statusCode || 500);
    }
  }

  async findAll() {
    try {
      const getAllLocations = await this.locationRepo.find();
      if (getAllLocations.length < 1)
        throw new NotFoundException('Locations not found').getResponse();
      return getAllLocations.reverse();
    } catch (error) {
      throw new HttpException(error.message, error.statusCode || 500);
    }
  }

  async findOne(id: string) {
    try {
      const findOneLocation = await this.locationRepo.findOneBy({
        locationId: id,
      });
      if (!findOneLocation)
        throw new NotFoundException(
          'Location with the provided id was not found',
        ).getResponse();
      return findOneLocation;
    } catch (error) {
      throw new HttpException(error.message, error.statusCode || 500);
    }
  }

  async update(id: string, updateLocationDto: UpdateLocationDto) {
    try {
      const findOneLocation = await this.findOne(id);
      Object.assign(findOneLocation, updateLocationDto);
      return await this.locationRepo.save(findOneLocation);
    } catch (error) {
      throw new HttpException(error.message, error.statusCode || 500);
    }
  }

  async remove(id: string) {
    try {
      const findOneLocation = await this.findOne(id);
      const deleteLocation = await this.locationRepo.remove(findOneLocation);
      return { ...deleteLocation, message: 'Location Deleted' };
    } catch (error) {
      throw new HttpException(error.message, error.statusCode || 500);
    }
  }
}
