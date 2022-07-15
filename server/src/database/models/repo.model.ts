import {
  Column,
  Model,
  Table,
  AutoIncrement,
  PrimaryKey,
  Default,
} from 'sequelize-typescript';

@Table
export class Repo extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column
  id: number;

  @Column
  owner: string;

  @Column
  name: string;

  @Default(false)
  @Column
  private: boolean;
}
