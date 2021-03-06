import { Table, Model, Column, HasMany } from 'sequelize-typescript';
import Record from './submission';

@Table
class Users extends Model<Users> {
  @Column({
    allowNull: false,
    unique: true,
    primaryKey: true
  })
  user_id: string;

  @Column({
    allowNull: false
  })
  nickname: string;

  @Column({
    allowNull: false
  })
  email: string;

  @Column({
    allowNull: false
  })
  password: string;

  @Column({
    allowNull: false
  })
  role: number;

  @Column
  avatar_url: string;

  @HasMany(() => Record)
  submissions: Record[];
}

export default Users;
