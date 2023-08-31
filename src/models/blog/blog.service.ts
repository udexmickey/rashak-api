import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { Repository } from 'typeorm';
import { Blog } from './entities/blog.entity';
import { v4 as uuid } from 'uuid';

@Injectable()
export class BlogService {
  constructor(
    @InjectRepository(Blog) private blogRepo: Repository<Blog>,
    private cloudinaryService: CloudinaryService,
  ) {}
  async create(
    filename: Express.Multer.File,
    createBlogDto: CreateBlogDto,
    author: string,
  ) {
    try {
      const blogId = uuid();
      const image = await this.cloudinaryService.uploadImage(
        filename,
        'BlogFolder',
      );
      const content = Buffer.from(createBlogDto.content, 'utf-8').toString();
      const payload = {
        ...createBlogDto,
        content,
        blogId,
        image: await image.secure_url,
        author: author,
      };
      const body = await this.blogRepo.create(payload);
      const newBlog = await this.blogRepo.save(body);
      return newBlog;
    } catch (error) {
      throw new HttpException(error.message, error.statusCode || 500);
    }
  }

  async findAll() {
    try {
      const getAll = await this.blogRepo.find();
      if (getAll.length < 1) throw new NotFoundException().getResponse();
      return getAll.reverse();
    } catch (error) {
      throw new HttpException(error.message, error.statusCode || 500);
    }
  }

  async findOne(id: string) {
    const findBlog = await this.blogRepo.findOneBy({ blogId: id });
    // const readTime = findBlog.content / 250
    if (!findBlog)
      throw new NotFoundException(
        `Blog with id "${id}" not found`,
      ).getResponse();
    return findBlog;
  }

  async update(id: string, updateBlogDto: UpdateBlogDto) {
    try {
      const findBlog = await this.findOne(id);
      const blog = Object.assign(findBlog, updateBlogDto);
      return await this.blogRepo.save(blog);
    } catch (error) {
      throw new HttpException(error.message, error.statusCode || 500);
    }
  }

  async remove(id: string) {
    try {
      const findBlog = await this.findOne(id);
      const deleteBlog = await this.blogRepo.remove(findBlog);
      return {
        ...deleteBlog,
        message: `Blog (${findBlog.title}) removed`,
      };
    } catch (error) {
      throw new HttpException(error.message, error.statusCode || 500);
    }
  }
}
