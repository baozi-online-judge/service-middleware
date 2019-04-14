import {
  Table,
  Model,
  Column,
  ForeignKey,
  BelongsTo
} from 'sequelize-typescript';
import User from './user';
import Problem from './problem';

@Table
class Records extends Model<Records> {
  @Column({
    allowNull: false,
    unique: true,
    primaryKey: true,
    autoIncrement: true
  })
  record_id: number;

  @ForeignKey(() => User)
  @Column({
    allowNull: false
  })
  user_id: string;

  @BelongsTo(() => User)
  user: User;

  @ForeignKey(() => Problem)
  @Column({
    allowNull: false
  })
  problem_id: string;

  @BelongsTo(() => Problem)
  problem: Problem;

  @Column({
    allowNull: false
  })
  result: number;

  @Column
  example_input: string;

  @Column
  expect_output: string;

  @Column
  user_output: string;

  @Column({
    allowNull: false
  })
  language: string;

  @Column({
    allowNull: false
  })
  code: string;

  @Column({
    allowNull: false
  })
  time: number;
}

export default Records;
