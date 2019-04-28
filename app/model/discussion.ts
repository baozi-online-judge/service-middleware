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
class Discussions extends Model<Discussions> {
  @Column({
    allowNull: false,
    unique: true,
    primaryKey: true,
    autoIncrement: true
  })
  discussion_id: number;

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
  title: string;

  @Column({
    allowNull: false
  })
  content: string;

  @Column({
    allowNull: false
  })
  update_time: number;

  @Column({
    allowNull: false
  })
  create_time: number;
}

export default Discussions;
