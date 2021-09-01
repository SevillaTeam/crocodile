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
} from 'sequelize-typescript';

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
}
