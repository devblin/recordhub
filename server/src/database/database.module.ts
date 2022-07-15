import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { AppConfig } from 'src/config/interfaces';
import { Repo } from './models/repo.model';
import { User } from './models/user.model';

@Module({
  imports: [
    SequelizeModule.forRootAsync({
      useFactory: async (configService: ConfigService<AppConfig>) => ({
        dialect: 'sqlite',
        storage: configService.get<string>('database.storagePath'),
        autoLoadModels: true,
        synchronize: true,
        models: [User, Repo],
      }),
      inject: [ConfigService],
    }),
  ],
})
export class DatabaseModule {}
