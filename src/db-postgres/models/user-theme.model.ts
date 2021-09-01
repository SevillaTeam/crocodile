import {
  Model,
  Table,
  Column,
  DataType,
  PrimaryKey,
  AutoIncrement,
  AllowNull,
  ForeignKey,
  Index,
} from 'sequelize-typescript';

import { User } from './user.model';
import { SiteTheme } from './site-theme.model';

@Table({
  timestamps: false,
  paranoid: true,
  tableName: 'user_theme',
})
export class UserTheme extends Model<UserTheme> {
  @AutoIncrement
  @PrimaryKey
  @Column(DataType.INTEGER)
  // @ts-ignore
  id: number;

  @AllowNull(false)
  @Column(DataType.STRING)
  // @ts-ignore
  theme: string;

  @ForeignKey(() => SiteTheme)
  @AllowNull(false)
  @Column(DataType.INTEGER)
  // @ts-ignore
  themeId: string;

  @Column(DataType.STRING)
  // @ts-ignore
  device: string;

  @Index
  @ForeignKey(() => User)
  @AllowNull(false)
  @Column(DataType.INTEGER)
  // @ts-ignore
  ownerId: string;
}
