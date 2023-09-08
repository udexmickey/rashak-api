import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { BoardmembersService } from './boardmembers.service';
import { CreateBoardmemberDto } from './dto/create-boardmember.dto';
import { UpdateBoardmemberDto } from './dto/update-boardmember.dto';
import { Boardmember } from './dto/boardmember.dto';
import { Department } from 'src/utils/Decorators/department.decorator';
import { SerializeResponse } from 'src/utils/Decorators/serializer.decorator';
import { DepartmentEnum } from 'src/utils/Enum/department.enum';
import { DepartmentGuard } from 'src/utils/Guards/department.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import {
  ApiBody,
  ApiConsumes,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';

@Controller('boardmembers')
@ApiTags('Board Members')
@SerializeResponse(Boardmember)
export class BoardmembersController {
  constructor(private readonly boardmembersService: BoardmembersService) {}

  @Post()
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description:
      'Create new board member, **Note** After creating a new board member the file/image will be hosting on cloudinary, a reference to the image path url on cloudinary will be sent back to the user',
    schema: {
      type: 'object',
      properties: {
        name: { type: 'string' },
        content: { type: 'string' },
        role: { type: 'string' },
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @ApiOperation({
    description: 'Add new board member imparted to the database',
    summary: 'Add new board member',
  })
  @ApiCreatedResponse({
    description: 'The boardmember has been successfully created.',
    type: CreateBoardmemberDto,
  })
  @UseGuards(DepartmentGuard)
  @Department(DepartmentEnum.IT)
  @UseInterceptors(FileInterceptor('file'))
  async create(
    @UploadedFile() file: Express.Multer.File,
    @Body() createBoardmemberDto: CreateBoardmemberDto,
  ) {
    return this.boardmembersService.create(file, createBoardmemberDto);
  }

  @Get()
  @ApiOperation({
    description: 'Fetch all boardmembers from the database',
    summary: 'Fetch All BoardMembers',
  })
  @ApiOkResponse({
    description: 'Successfully fetched boardmembers paginated data',
    type: [CreateBoardmemberDto],
  })
  @ApiQuery({
    description:
      'you can search based on the boardmembers properties that exists in the database',
    name: 'State',
    required: false,
    type: String,
    // example: 'BoardMember 1',
  })
  @ApiQuery({
    description: 'Query boardmembers base on page number',
    name: 'page',
    required: false,
    type: Number,
    example: 1,
  })
  @ApiQuery({
    description: 'Query boardmembers base on page number',
    name: 'role',
    required: false,
    type: String,
    // example: 2,
  })
  @ApiQuery({
    description: 'Query boardmembers base on page String',
    name: 'boardmemberId',
    required: false,
    type: String,
    // example: 2,
  })
  @ApiQuery({
    description: `Obtain boardmembers data based on limit... max ${Number(10)}`,
    name: 'limit',
    required: false,
    type: Number,
    example: 10,
  })
  @ApiQuery({
    description: `Obtain boardmembers based on search word`,
    name: 'search',
    required: false,
    type: String,
    // example: 'BoardMember 2',
  })
  findAll() {
    return this.boardmembersService.findAll();
  }

  @Get(':id')
  @ApiOperation({
    description: 'Use this to obtain a boardmember from the database',
    summary: 'Obtain a BoardMember',
  })
  @ApiParam({
    name: 'boardMemberd',
    description: 'provide a valid boardMemberd that exists in the database',
    type: String,
  })
  @ApiOkResponse({ type: CreateBoardmemberDto })
  findOne(@Param('id') id: string) {
    return this.boardmembersService.findOne(id);
  }

  @UseGuards(DepartmentGuard)
  @Department(DepartmentEnum.IT)
  @Patch(':id')
  @ApiOperation({
    description:
      'Obtain a boardmember from the database, then update the fetched boardmember',
    summary: 'Update a BoardMembers',
  })
  @ApiParam({
    name: 'boardMemberd',
    description: 'provide a valid boardMemberd that exists in the database',
    type: String,
  })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description:
      'Update existing board member, **Note** After Update existing the board member the file/image will be hosting on cloudinary, a reference to the image path url on cloudinary will be sent back to the user and then stored in the database as string',
    schema: {
      type: 'object',
      properties: {
        name: { type: 'string' },
        content: { type: 'string' },
        role: { type: 'string' },
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @ApiOkResponse({
    description: 'BoardMember data have been updated successfully',
    type: UpdateBoardmemberDto,
  })
  update(
    @Param('id') id: string,
    @Body() updateBoardmemberDto: UpdateBoardmemberDto,
  ) {
    return this.boardmembersService.update(id, updateBoardmemberDto);
  }

  @UseGuards(DepartmentGuard)
  @Department(DepartmentEnum.IT)
  @Delete(':id')
  @ApiOkResponse({
    description: 'BoardMembered deleted successful',
  })
  @ApiOperation({
    description:
      'Obtain a boardmember from the database, then delete the fetched boardmember',
    summary: 'Delete a BoardMember',
  })
  @ApiParam({
    name: 'boardMemberd',
    description: 'provide a valid boardMemberd that exists in the database',
    type: String,
  })
  remove(@Param('id') id: string) {
    return this.boardmembersService.remove(id);
  }
}
