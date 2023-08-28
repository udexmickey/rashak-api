import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Boardmember } from '../models/boardmembers/entities/boardmember.entity';
import { Admin } from '../models/admins/entities/admin.entity';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Story } from '../models/story/entities/story.entity';
import { Location } from 'src/models/location/entities/location.entity';
import { Partner } from 'src/models/partner/entities/partner.entity';
import { TeamMember } from 'src/models/teammeber/entities/teammember.entity';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'mongodb',
        host: configService.get('DATABASE_Host'),
        port: +configService.get('DATABASE_PORT'),
        database: configService.get('DATABASE_NAME_2'),
        entities: [Admin, Boardmember, TeamMember, Story, Location, Partner],
        synchronize: true,
        autoLoadEntities: true,
      }),
      inject: [ConfigService],
    }),
  ],
})
export class DatabaseModule {}
