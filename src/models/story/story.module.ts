import { Module } from '@nestjs/common';
import { StoryService } from './story.service';
import { StoryController } from './story.controller';
import { Story } from './entities/story.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Story])],
  controllers: [StoryController],
  providers: [StoryService],
})
export class StoryModule {}
