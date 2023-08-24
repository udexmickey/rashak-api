import { Module } from '@nestjs/common';
import { BoardmembersService } from './boardmembers.service';
import { BoardmembersController } from './boardmembers.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Boardmember } from './entities/boardmember.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Boardmember])],
  controllers: [BoardmembersController],
  providers: [BoardmembersService],
})
export class BoardmembersModule {}
