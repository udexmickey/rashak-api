import { Module } from '@nestjs/common';
import { BoardmembersService } from './boardmembers.service';
import { BoardmembersController } from './boardmembers.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Boardmember } from './entities/boardmember.entity';
import { CloudinaryModule } from 'src/cloudinary/cloudinary.module';

@Module({
  imports: [TypeOrmModule.forFeature([Boardmember]), CloudinaryModule],
  controllers: [BoardmembersController],
  providers: [BoardmembersService],
})
export class BoardmembersModule {}
