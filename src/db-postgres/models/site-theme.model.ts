import {
  Model,
  Table,
  Column,
  DataType,
  PrimaryKey,
  AutoIncrement,
  AllowNull,
  Unique,
  Index,
  HasMany,
} from 'sequelize-typescript';

import { UserTheme } from './user-theme.model';

@Table({
  timestamps: false,
  paranoid: true,
  tableName: 'site_theme',
})
export class SiteTheme extends Model<SiteTheme> {
  @AutoIncrement
  @PrimaryKey
  @Column(DataType.INTEGER)
  // @ts-ignore
  id: number;

  @Index
  @AllowNull(false)
  @Unique
  @Column(DataType.STRING)
  // @ts-ignore
  theme: string;

  @AllowNull(false)
  @Column(DataType.STRING)
  // @ts-ignore
  description: string;

  @HasMany(() => UserTheme)
  // @ts-ignore
  userTheme: UserTheme[];
}
