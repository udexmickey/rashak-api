import {
  Controller,
  Get,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { AdminsService } from './admins.service';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { SerializeResponse } from 'src/utils/Decorators/serializer.decorator';
import { AdminDto } from '../auth/dto/admin.dto';
import { Department } from 'src/utils/Decorators/department.decorator';
import { DepartmentEnum } from 'src/utils/Enum/department.enum';
import { DepartmentGuard } from 'src/utils/Guards/department.guard';
import { JwtAuthGuard } from '../auth/guard/jwt-auth.guard';

@Controller('admins')
@SerializeResponse(AdminDto)
export class AdminsController {
  constructor(private readonly adminsService: AdminsService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  findAll() {
    return this.adminsService.findAll();
  }

  @Get('/:id')
  @UseGuards(JwtAuthGuard, DepartmentGuard)
  @Department(DepartmentEnum.IT)
  findOne(@Param('id') id: string) {
    return this.adminsService.findOne(id);
  }

  @Patch('/:id')
  update(@Param('id') id: string, @Body() updateAdminDto: UpdateAdminDto) {
    return this.adminsService.update(id, updateAdminDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.adminsService.remove(id);
  }
}
