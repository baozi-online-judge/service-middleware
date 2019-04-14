import { Table, Model, Column, HasMany } from 'sequelize-typescript';
import Record from './submission';

@Table
class Problems extends Model<Problems> {
  @Column({
    allowNull: false,
    unique: true,
    primaryKey: true
  })
  problem_id: string;

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
  tags: string;

  @Column({
    allowNull: false
  })
  require_time: number;

  @Column({
    allowNull: false
  })
  difficulty: number;

  @Column
  template: string;

  @HasMany(() => Record)
  submissions: Record[];
}

export default Problems;
