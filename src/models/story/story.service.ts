import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateStoryDto } from './dto/create-story.dto';
import { UpdateStoryDto } from './dto/update-story.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Story } from './entities/story.entity';
import { v4 as uuid } from 'uuid';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';

@Injectable()
export class StoryService {
  constructor(
    @InjectRepository(Story) private storyRepo: Repository<Story>,
    private cloudinaryService: CloudinaryService,
  ) {}

  async create(filename: Express.Multer.File, createStoryDto: CreateStoryDto) {
    try {
      const storyId = uuid();
      const image = await this.cloudinaryService.uploadImage(
        filename,
        'StoryFolder',
      );
      const payload = { ...createStoryDto, storyId, image: image.url };
      const newStory = this.storyRepo.create(payload);
      return await this.storyRepo.save(newStory);
    } catch (error) {
      throw new HttpException(error.message, error.statusCode || 500);
    }
  }

  async findAll() {
    try {
      const allStories = await this.storyRepo.find();
      return allStories.reverse();
    } catch (error) {
      throw new HttpException(error.message, error.statusCode || 500);
    }
  }

  async findOne(id: string) {
    const findStory = await this.storyRepo.findOneBy({ storyId: id });
    if (!findStory)
      throw new NotFoundException(
        `Story with id "${id}" not found`,
      ).getResponse();
    return findStory;
  }

  async update(id: string, updateStoryDto: UpdateStoryDto) {
    try {
      const findStory = await this.findOne(id);
      const story = Object.assign(findStory, updateStoryDto);
      const updatedStory = await this.storyRepo.save(story);
      return updatedStory;
    } catch (error) {
      throw new HttpException(error.message, error.statusCode || 500);
    }
  }

  async remove(id: string) {
    try {
      const findStory = await this.findOne(id);
      const deleteStory = await this.storyRepo.remove(findStory);
      return { ...deleteStory, message: 'Story Deleted' };
    } catch (error) {
      throw new HttpException(error.message, error.statusCode || 500);
    }
  }
}
