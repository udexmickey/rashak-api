import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { BlogService } from './blog.service';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { SerializeResponse } from 'src/utils/Decorators/serializer.decorator';
import { BlogDto } from './dto/blog.dto';
import { CurrentAdmin } from 'src/utils/Decorators/current-admin.decorator';
import { CurrentUserInterceptor } from '../auth/interceptors/current-admin.interceptor';
import { Admin } from '../admins/entities/admin.entity';

@Controller('blog')
@SerializeResponse(BlogDto)
export class BlogController {
  constructor(private readonly blogService: BlogService) {}

  @Post()
  @UseInterceptors(FileInterceptor('file'), CurrentUserInterceptor)
  async create(
    @UploadedFile() file: Express.Multer.File,
    @Body() createPartnerDto: CreateBlogDto,
    @CurrentAdmin() admin: Admin,
  ) {
    const author = admin.fullName;
    return await this.blogService.create(file, createPartnerDto, author);
  }

  @Get()
  findAll() {
    return this.blogService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.blogService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBlogDto: UpdateBlogDto) {
    return this.blogService.update(id, updateBlogDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.blogService.remove(id);
  }
}
