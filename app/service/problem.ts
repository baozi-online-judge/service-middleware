import { Service } from 'egg';
import Problem from '../model/problem';

export interface CreateProblemInput {
  problem_id: string;
  title: string;
  content: string;
  tags: string;
  require_time: number;
  difficulty: 1 | 2 | 3;
  template: string;
}

export default class ProblemService extends Service {
  async findProblemsByIds(ids: string[]): Promise<Problem[]> {
    const result = await Problem.findAll({
      where: { problem_id: { $in: ids } }
    });
    return result;
  }

  async findAllProblems(): Promise<Problem[]> {
    return await Problem.findAll();
  }

  async create(args: CreateProblemInput) {
    const {
      problem_id,
      title,
      content,
      tags,
      require_time = 1000,
      difficulty,
      template = ''
    } = args;
    const problems = await this.findProblemsByIds([ problem_id ]);
    if (problems.length >= 1) {
      return null;
    }
    const result = await Problem.create({
      problem_id,
      title,
      content,
      tags,
      require_time,
      difficulty,
      template
    });
    return result;
  }

  async update(args: Partial<CreateProblemInput>) {
    const result = await Problem.update(
      {
        ...args
      },
      {
        where: { problem_id: args.problem_id! }
      }
    );
    return result;
  }
}
