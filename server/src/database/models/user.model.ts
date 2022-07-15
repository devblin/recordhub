import {
  Column,
  Model,
  Table,
  AutoIncrement,
  PrimaryKey,
  IsEmail,
  IsUrl,
} from 'sequelize-typescript';
import { AuthProvider } from '../../shared';

@Table
export class User extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column
  id: number;

  @Column
  displayName: string;

  @Column
  userName: string;

  @IsEmail
  @Column
  email: string;

  @Column
  provider: AuthProvider;

  @Column
  providerId: string;

  @IsUrl
  @Column
  profileImage: string;

  @Column
  accessToken: string;
}
