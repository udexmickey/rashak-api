import { Module } from '@nestjs/common';
import { TeamMemberService } from './teammember.service';
import { TeamMemberController } from './teammember.controller';
import { TeamMember } from './entities/teammember.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([TeamMember])],
  controllers: [TeamMemberController],
  providers: [TeamMemberService],
})
export class TeamMemberModule {}
