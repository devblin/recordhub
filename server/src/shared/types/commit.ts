import { Repo } from '../../database/models/repo.model';
import { User } from '../../database/models/user.model';

export type SampleFileCommitData = {
  owner: User['userName'];
  repoName: Repo['name'];
  filePath: string;
  commitMessage: string;
  fileContent: string;
  email: string;
};
