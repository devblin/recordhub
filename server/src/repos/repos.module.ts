import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from '../database/models/user.model';
import { UsersService } from 'src/users/users.service';
import { Repo } from '../database/models/repo.model';
import { ReposController } from './repos.controller';
import { ReposService } from './repos.service';
import { CommitService } from 'src/commit/commit.service';

@Module({
  providers: [ReposService, UsersService, CommitService],
  exports: [ReposService],
  controllers: [ReposController],
  imports: [SequelizeModule.forFeature([Repo, User])],
})
export class ReposModule {}
