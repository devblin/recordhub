import { AuthProvider } from './auth';

export interface IUser {
  id: number;
  provider: AuthProvider;
  providerId: string;
  displayName: string;
  userName: string;
  email: string;
  profileImage: string;
  accessToken: string;
  repos: number[];
}
