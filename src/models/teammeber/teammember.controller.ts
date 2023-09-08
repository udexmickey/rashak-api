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
import { TeamMemberService } from './teammember.service';
import { CreateTeamMemberDto } from './dto/create-teammember.dto';
import { UpdateTeamMemberDto } from './dto/update-teammember.dto';
import { Department } from 'src/utils/Decorators/department.decorator';
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

@Controller('teammembers')
@ApiTags('Team Members')
export class TeamMemberController {
  constructor(private readonly teammemberService: TeamMemberService) {}

  @Post()
  @ApiBody({
    type: CreateTeamMemberDto,
    description: 'Create new Team Member',
  })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description:
      'Create new team member, **Note** After creating new team member the file/image will be hosting on cloudinary, a reference to the image path url on cloudinary will be sent back to the user and then stored in the database as string',
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
    description: 'Add new team member imparted to the database',
    summary: 'Add new team member',
  })
  @ApiCreatedResponse({
    description: 'The teammember has been successfully created.',
    type: CreateTeamMemberDto,
  })
  @UseGuards(DepartmentGuard)
  @Department(DepartmentEnum.IT)
  @UseInterceptors(FileInterceptor('file'))
  async create(
    @UploadedFile() file: Express.Multer.File,
    @Body() createTeamMemberDto: CreateTeamMemberDto,
  ) {
    return this.teammemberService.create(file, createTeamMemberDto);
  }

  @Get()
  @ApiOperation({
    description: 'Fetch all teammembers from the database',
    summary: 'Fetch All TeamMembers',
  })
  @ApiOkResponse({
    description: 'Successfully fetched teammembers paginated data',
    type: [CreateTeamMemberDto],
  })
  @ApiQuery({
    description:
      'you can search based on the teammembers properties that exists in the database',
    name: 'State',
    required: false,
    type: String,
    // example: 'TeamMember 1',
  })
  @ApiQuery({
    description: 'Query teammembers base on page number',
    name: 'page',
    required: false,
    type: Number,
    example: 1,
  })
  @ApiQuery({
    description: 'Query teammembers base on page number',
    name: 'role',
    required: false,
    type: String,
    // example: 2,
  })
  @ApiQuery({
    description: 'Query teammembers base on page String',
    name: 'teammemberId',
    required: false,
    type: String,
    // example: 2,
  })
  @ApiQuery({
    description: `Obtain teammembers data based on limit... max ${Number(10)}`,
    name: 'limit',
    required: false,
    type: Number,
    example: 10,
  })
  @ApiQuery({
    description: `Obtain teammembers based on search word`,
    name: 'search',
    required: false,
    type: String,
    // example: 'TeamMember 2',
  })
  findAll() {
    return this.teammemberService.findAll();
  }

  @Get(':id')
  @ApiOperation({
    description: 'Use this to obtain a teammember from the database',
    summary: 'Obtain a TeamMember',
  })
  @ApiParam({
    name: 'teamMemberd',
    description: 'provide a valid teamMemberd that exists in the database',
    type: String,
  })
  @ApiOkResponse({ type: CreateTeamMemberDto })
  findOne(@Param('id') id: string) {
    return this.teammemberService.findOne(id);
  }

  @UseGuards(DepartmentGuard)
  @Department(DepartmentEnum.IT)
  @Patch(':id')
  @ApiOperation({
    description:
      'Obtain a teammember from the database, then update the fetched teammember',
    summary: 'Update a TeamMembers',
  })
  @ApiParam({
    name: 'teamMemberd',
    description: 'provide a valid teamMemberd that exists in the database',
    type: String,
  })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description:
      'Update existing team member, **Note** After Update existing the team member the file/image will be hosting on cloudinary, a reference to the image path url on cloudinary will be sent back to the user and then stored in the database as string',
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
    description: 'TeamMember data have been updated successfully',
    type: UpdateTeamMemberDto,
  })
  update(
    @Param('id') id: string,
    @Body() updateTeamMemberDto: UpdateTeamMemberDto,
  ) {
    return this.teammemberService.update(id, updateTeamMemberDto);
  }

  @UseGuards(DepartmentGuard)
  @Department(DepartmentEnum.IT)
  @Delete(':id')
  @ApiOkResponse({
    description: 'TeamMembered deleted successful',
  })
  @ApiOperation({
    description:
      'Obtain a teammember from the database, then delete the fetched teammember',
    summary: 'Delete a TeamMember',
  })
  @ApiParam({
    name: 'teamMemberd',
    description: 'provide a valid teamMemberd that exists in the database',
    type: String,
  })
  remove(@Param('id') id: string) {
    return this.teammemberService.remove(id);
  }
}
