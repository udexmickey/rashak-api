import { Module } from '@nestjs/common';
import { TeamMemberService } from './teammember.service';
import { TeamMemberController } from './teammember.controller';
import { TeamMember } from './entities/teammember.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CloudinaryModule } from 'src/cloudinary/cloudinary.module';

@Module({
  imports: [TypeOrmModule.forFeature([TeamMember]), CloudinaryModule],
  controllers: [TeamMemberController],
  providers: [TeamMemberService],
})
export class TeamMemberModule {}
