import { Module } from '@nestjs/common';
import { BlogService } from './blog.service';
import { BlogController } from './blog.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Blog } from './entities/blog.entity';
import { CloudinaryModule } from 'src/cloudinary/cloudinary.module';
import { CurrentUserInterceptor } from '../auth/interceptors/current-admin.interceptor';
import { AdminsModule } from '../admins/admins.module';

@Module({
  imports: [TypeOrmModule.forFeature([Blog]), CloudinaryModule, AdminsModule],
  controllers: [BlogController],
  providers: [BlogService, CurrentUserInterceptor],
})
export class BlogModule {}
