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
import { BoardmembersService } from './boardmembers.service';
import { CreateBoardmemberDto } from './dto/create-boardmember.dto';
import { UpdateBoardmemberDto } from './dto/update-boardmember.dto';
import { Boardmember } from './dto/boardmember.dto';
import { Department } from 'src/utils/Decorators/department.decorator';
import { SerializeResponse } from 'src/utils/Decorators/serializer.decorator';
import { DepartmentEnum } from 'src/utils/Enum/department.enum';
import { DepartmentGuard } from 'src/utils/Guards/department.guard';

@Controller('boardmembers')
@SerializeResponse(Boardmember)
export class BoardmembersController {
  constructor(private readonly boardmembersService: BoardmembersService) {}

  @Post()
  @UseGuards(DepartmentGuard)
  @Department(DepartmentEnum.IT)
  create(@Body() createBoardmemberDto: CreateBoardmemberDto) {
    return this.boardmembersService.create(createBoardmemberDto);
  }

  @Get()
  findAll() {
    return this.boardmembersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.boardmembersService.findOne(id);
  }

  @UseGuards(DepartmentGuard)
  @Department(DepartmentEnum.IT)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateBoardmemberDto: UpdateBoardmemberDto,
  ) {
    return this.boardmembersService.update(id, updateBoardmemberDto);
  }

  @UseGuards(DepartmentGuard)
  @Department(DepartmentEnum.IT)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.boardmembersService.remove(id);
  }
}
