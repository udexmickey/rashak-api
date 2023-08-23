import { Module } from '@nestjs/common';
import { BoardmembersService } from './boardmembers.service';
import { BoardmembersController } from './boardmembers.controller';

@Module({
  controllers: [BoardmembersController],
  providers: [BoardmembersService]
})
export class BoardmembersModule {}
