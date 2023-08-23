import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { BoardmembersService } from './boardmembers.service';
import { CreateBoardmemberDto } from './dto/create-boardmember.dto';
import { UpdateBoardmemberDto } from './dto/update-boardmember.dto';

@Controller('boardmembers')
export class BoardmembersController {
  constructor(private readonly boardmembersService: BoardmembersService) {}

  @Post()
  create(@Body() createBoardmemberDto: CreateBoardmemberDto) {
    return this.boardmembersService.create(createBoardmemberDto);
  }

  @Get()
  findAll() {
    return this.boardmembersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.boardmembersService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateBoardmemberDto: UpdateBoardmemberDto,
  ) {
    return this.boardmembersService.update(+id, updateBoardmemberDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.boardmembersService.remove(+id);
  }
}
