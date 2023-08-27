import { Module } from '@nestjs/common';
import { AdminsService } from './admins.service';
import { AdminsController } from './admins.controller';
import { Admin } from './entities/admin.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthGuard } from '../auth/guard/auth.guard';
import { JwtService } from '@nestjs/jwt';
import { MailsModule } from '../mails/mails.module';

@Module({
  imports: [TypeOrmModule.forFeature([Admin]), MailsModule],
  controllers: [AdminsController],
  providers: [AdminsService, AuthGuard, JwtService],
  exports: [AdminsService],
})
export class AdminsModule {}
