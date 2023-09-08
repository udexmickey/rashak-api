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
import {
  ApiBody,
  ApiConsumes,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';

@Controller('blog')
@ApiTags('Blog')
@SerializeResponse(BlogDto)
export class BlogController {
  constructor(private readonly blogService: BlogService) {}

  @Post()
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description:
      'Create new blog, **Note** After creating a new blog the file/image will be hosting on cloudinary, a reference to the image path url on cloudinary will be sent back to the user',
    schema: {
      type: 'object',
      properties: {
        title: { type: 'string' },
        content: { type: 'string' },
        author: { type: 'string' },
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @ApiOperation({
    description: 'Add new blog imparted to the database',
    summary: 'Add new blog',
  })
  @ApiCreatedResponse({
    description: 'The blog has been successfully created.',
    type: CreateBlogDto,
  })
  @ApiForbiddenResponse({ description: 'Forbidden.' })
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
  @ApiOperation({
    description: 'Fetch all blogs from the database',
    summary: 'Fetch All Blogs',
  })
  @ApiOkResponse({
    description: 'Successfully fetched blogs paginated data',
    type: [CreateBlogDto],
  })
  @ApiQuery({
    description:
      'you can search based on the blogs properties that exists in the database',
    name: 'State',
    required: false,
    type: String,
    // example: 'Blog 1',
  })
  @ApiQuery({
    description: 'Query blogs base on page number',
    name: 'page',
    required: false,
    type: Number,
    // example: 2,
  })
  @ApiQuery({
    description: `Obtain blogs data based on limit... max ${Number(10)}`,
    name: 'limit',
    required: false,
    type: Number,
    // example: 10,
  })
  @ApiQuery({
    description: `Obtain blogs based on search word`,
    name: 'search',
    required: false,
    type: String,
    // example: 'Blog 2',
  })
  findAll() {
    return this.blogService.findAll();
  }

  @Get(':id')
  @ApiOperation({
    description: 'Use this to obtain a blog from the database',
    summary: 'Obtain a Blog',
  })
  @ApiParam({
    name: 'blogId',
    description: 'provide a valid blogId that exists in the database',
    type: String,
  })
  @ApiOkResponse({ type: CreateBlogDto })
  findOne(@Param('id') id: string) {
    return this.blogService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({
    description:
      'Obtain a blog from the database, then update the fetched blog',
    summary: 'Update a Blogs',
  })
  @ApiParam({
    name: 'blogId',
    description: 'provide a valid blogId that exists in the database',
    type: String,
  })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'Update existing blog',
    schema: {
      type: 'object',
      properties: {
        title: { type: 'string' },
        content: { type: 'string' },
        author: { type: 'string' },
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @ApiOkResponse({
    description: 'Blog data have been updated successfully',
    type: UpdateBlogDto,
  })
  update(@Param('id') id: string, @Body() updateBlogDto: UpdateBlogDto) {
    return this.blogService.update(id, updateBlogDto);
  }

  @Delete(':id')
  @ApiOkResponse({
    description: 'Bloged deleted successful',
  })
  @ApiOperation({
    description:
      'Obtain a blog from the database, then delete the fetched blog',
    summary: 'Delete a Blog',
  })
  @ApiParam({
    name: 'blogId',
    description: 'provide a valid blogId that exists in the database',
    type: String,
  })
  remove(@Param('id') id: string) {
    return this.blogService.remove(id);
  }
}
