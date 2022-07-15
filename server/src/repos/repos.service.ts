import { ConflictException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Octokit } from '@octokit/rest';
import { Repo } from '../database/models/repo.model';
import { UsersService } from 'src/users/users.service';
import { OCTOKIT_ROUTES } from 'src/shared/utils/repos';
import { User } from 'src/database/models/user.model';
import { getNewFileCommitData, SampleFileType } from 'src/shared/utils/file';
import { CommitService } from 'src/commit/commit.service';

@Injectable()
export class ReposService {
  constructor(
    @InjectModel(Repo)
    private readonly repoModel: typeof Repo,
    private readonly userService: UsersService,
    private readonly commitService: CommitService,
  ) { }

  async findAll(): Promise<Repo[]> {
    return await this.repoModel.findAll({
      order: [['id', 'DESC']],
    });
  }

  async findAllByOwner(owner: User['userName']): Promise<Repo[]> {
    return await this.repoModel.findAll({
      where: { owner },
    });
  }

  async findOneById(id: number): Promise<Repo> {
    return await this.repoModel.findOne({
      where: { id },
    });
  }

  async createOne(
    userId: number,
    repoName: string,
    isPrivate: boolean,
  ): Promise<Repo> {
    const user = await this.userService.findOneComplete(userId);
    const repo = await this.repoModel.findOne({
      where: { name: repoName, owner: user.userName },
    });

    if (repo && repo.id) {
      throw new ConflictException(`Repository '${repoName}' already exists.`);
    }

    const octokit = new Octokit({ auth: user.accessToken });
    const route = OCTOKIT_ROUTES.createRepo();

    const res = await octokit.request(route, {
      name: repoName,
      private: isPrivate,
    });

    if (res.status === 201) {
      const createdRepo = await this.repoModel.create({
        name: repoName,
        private: isPrivate,
        owner: user.userName,
      });

      const filePairs: { path: string; type: SampleFileType }[] = [
        { path: 'README.md', type: 'readme' },
        { path: 'fibonacci.py', type: 'py' },
        { path: 'fibonacci.cpp', type: 'cpp' },
        { path: 'fibonacci.js', type: 'js' },
      ];

      for (const filePair of filePairs) {
        const { path, type } = filePair;
        const { message, content } = getNewFileCommitData(path, type);

        await this.commitService.createOneFile(octokit, {
          owner: user.userName,
          repoName: repoName,
          filePath: path,
          commitMessage: message,
          fileContent: content,
          email: user.email,
        });
      }

      return createdRepo;
    }

    return {} as Repo;
  }
}
