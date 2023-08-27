import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { TeamMemberService } from './teammember.service';
import { CreateTeamMemberDto } from './dto/create-teammember.dto';
import { UpdateTeamMemberDto } from './dto/update-teammember.dto';
import { Department } from 'src/utils/Decorators/department.decorator';
import { DepartmentEnum } from 'src/utils/Enum/department.enum';
import { DepartmentGuard } from 'src/utils/Guards/department.guard';

@Controller('teammembers')
export class TeamMemberController {
  constructor(private readonly teammemberService: TeamMemberService) {}

  @Post()
  @UseGuards(DepartmentGuard)
  @Department(DepartmentEnum.IT)
  create(@Body() createTeamMemberDto: CreateTeamMemberDto) {
    return this.teammemberService.create(createTeamMemberDto);
  }

  @Get()
  findAll() {
    return this.teammemberService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.teammemberService.findOne(id);
  }

  @UseGuards(DepartmentGuard)
  @Department(DepartmentEnum.IT)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateTeamMemberDto: UpdateTeamMemberDto,
  ) {
    return this.teammemberService.update(id, updateTeamMemberDto);
  }

  @UseGuards(DepartmentGuard)
  @Department(DepartmentEnum.IT)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.teammemberService.remove(id);
  }
}
