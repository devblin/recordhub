import { Injectable } from '@nestjs/common';
import { OCTOKIT_ROUTES } from '../shared/utils/repos';
import { Octokit } from '@octokit/rest';
import { SampleFileCommitData } from '../shared/types/commit';

@Injectable()
export class CommitService {
  constructor() {}

  async createOneFile(octokit: Octokit, data: SampleFileCommitData) {
    const { owner, repoName, filePath, commitMessage, fileContent, email } =
      data;

    const route = OCTOKIT_ROUTES.commitFile({
      owner,
      repo: repoName,
      path: filePath,
    });

    const res = await octokit.request(route, {
      owner: owner,
      repo: repoName,
      path: filePath,
      message: commitMessage,
      content: fileContent,
    });

    if (res.status === 201) {
      return { success: true };
    }

    return { success: false };
  }
}
