import { IUser } from './users';

export interface IRepo {
  id: number;
  owner: IUser['userName'];
  name: string;
  private: boolean;
}
