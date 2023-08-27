import {
  Controller,
  Get,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Post,
} from '@nestjs/common';
import { AdminsService } from './admins.service';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { SerializeResponse } from 'src/utils/Decorators/serializer.decorator';
import { AdminDto } from '../auth/dto/admin.dto';
import { JwtAuthGuard } from '../auth/guard/jwt-auth.guard';
import { LoginDto } from '../auth/dto/login.dto';

@Controller('admins')
@SerializeResponse(AdminDto)
export class AdminsController {
  constructor(private readonly adminsService: AdminsService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  async findAll() {
    const allAdmin = await this.adminsService.findAll();
    return allAdmin;
  }

  @Get('/:id')
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

  @Post('/forgetPassword')
  forgetPassword(@Body() body: LoginDto) {
    return this.adminsService.forgetPassword(body);
  }
}
