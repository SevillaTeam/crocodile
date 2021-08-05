import {
  Model,
  Table,
  Column,
  DataType,
  PrimaryKey,
} from 'sequelize-typescript';

@Table({
  timestamps: false, // don't add 'created_at', 'updated_at'
  paranoid: true, // add 'deleted_at'
  tableName: 'users',
})
export class User extends Model<User> {
  @PrimaryKey
  @Column(DataType.INTEGER)
  // @ts-ignore
  id: number;
}
