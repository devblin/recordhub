export type AuthProvider = 'github';

export type JwtPayload = {
  id: number;

  displayName: string;

  userName: string;

  profileImage: string;
};
