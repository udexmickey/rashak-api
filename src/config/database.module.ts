import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Boardmember } from 'src/models/boardmembers/entities/boardmember.entity';
import { Admin } from '../models/admins/entities/admin.entity';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'mongodb',
        host: configService.get('DATABASE_Host'),
        port: +configService.get('DATABASE_PORT'),
        database: configService.get('DATABASE_NAME'),
        entities: [Admin, Boardmember],
        synchronize: true,
        autoLoadEntities: true,
      }),
      inject: [ConfigService],
    }),
  ],
})
export class DatabaseModule {}
