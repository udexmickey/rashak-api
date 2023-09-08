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
import { StoryService } from './story.service';
import { CreateStoryDto } from './dto/create-story.dto';
import { UpdateStoryDto } from './dto/update-story.dto';
import { SerializeResponse } from 'src/utils/Decorators/serializer.decorator';
import { StoryDto } from './dto/story.dto';
import { FileInterceptor } from '@nestjs/platform-express';
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

@Controller('story')
@ApiTags('Story')
@SerializeResponse(StoryDto)
export class StoryController {
  constructor(private readonly storyService: StoryService) {}

  @Post()
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description:
      'Create new story, **Note** After creating a new story the file/image will be hosting on cloudinary, a reference to the image path url on cloudinary will be sent back to the user',
    schema: {
      type: 'object',
      properties: {
        youtube_link: { type: 'string' },
        title: { type: 'integer' },
        content: { type: 'integer' },
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @ApiOperation({
    description: 'Add new story imparted to the database',
    summary: 'Add new story',
  })
  @ApiCreatedResponse({
    description: 'The story has been successfully created.',
    type: CreateStoryDto,
  })
  @ApiForbiddenResponse({ description: 'Forbidden.' })
  @UseInterceptors(FileInterceptor('file'))
  async create(
    @UploadedFile() file: Express.Multer.File,
    @Body() createStoryDto: CreateStoryDto,
  ) {
    return this.storyService.create(file, createStoryDto);
  }

  @Get()
  @ApiOperation({
    description: 'Fetch all storys from the database',
    summary: 'Fetch All Storys',
  })
  @ApiOkResponse({
    description: 'Successfully fetched storys paginated data',
    type: [CreateStoryDto],
  })
  @ApiQuery({
    description:
      'you can search based on the storys properties that exists in the database',
    name: 'State',
    required: false,
    type: String,
    // example: 'Story 1',
  })
  @ApiQuery({
    description: 'Query storys base on page number',
    name: 'page',
    required: false,
    type: Number,
    // example: 2,
  })
  @ApiQuery({
    description: `Obtain storys data based on limit... max ${Number(10)}`,
    name: 'limit',
    required: false,
    type: Number,
    // example: 10,
  })
  @ApiQuery({
    description: `Obtain storys based on search word`,
    name: 'search',
    required: false,
    type: String,
    // example: 'Story 2',
  })
  findAll() {
    return this.storyService.findAll();
  }

  @Get(':id')
  @ApiOperation({
    description: 'Use this to obtain a story from the database',
    summary: 'Obtain a Story',
  })
  @ApiParam({
    name: 'storyId',
    description: 'provide a valid storyId that exists in the database',
    type: String,
  })
  @ApiOkResponse({ type: CreateStoryDto })
  findOne(@Param('id') id: string) {
    return this.storyService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({
    description:
      'Obtain a story from the database, then update the fetched story',
    summary: 'Update a Storys',
  })
  @ApiParam({
    name: 'storyId',
    description: 'provide a valid storyId that exists in the database',
    type: String,
  })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description:
      'Update existing story, **Note** After Update existing the story the file/image will be hosting on cloudinary, a reference to the image path url on cloudinary will be sent back to the user and then stored in the database as string',
    schema: {
      type: 'object',
      properties: {
        youtube_link: { type: 'string' },
        title: { type: 'integer' },
        content: { type: 'integer' },
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @ApiOkResponse({
    description: 'Story data have been updated successfully',
    type: UpdateStoryDto,
  })
  update(@Param('id') id: string, @Body() updateStoryDto: UpdateStoryDto) {
    return this.storyService.update(id, updateStoryDto);
  }

  @Delete(':id')
  @ApiOkResponse({
    description: 'Storyed deleted successful',
  })
  @ApiOperation({
    description:
      'Obtain a story from the database, then delete the fetched story',
    summary: 'Delete a Story',
  })
  @ApiParam({
    name: 'storyId',
    description: 'provide a valid storyId that exists in the database',
    type: String,
  })
  remove(@Param('id') id: string) {
    return this.storyService.remove(id);
  }
}
