import { Service } from 'egg';
import Submission from '../model/submission';
import Problem from '../model/problem';

export interface CreateSubmissionInput {
  user_id: string;
  problem_id: string;
  result?: number;
  language: 'js' | 'cpp';
  code: string;
  time?: string;
}

export default class SubmissionService extends Service {
  async findRelatedSubmissions(userId: string) {
    const result = await Submission.findAll({
      where: { user_id: { $in: [ userId ] } },
      include: [ Problem ],
      order: [[ 'time', 'DESC' ]]
    });
    return result;
  }

  async fetchById(recordId: string) {
    const result = await Submission.findOne({
      where: { record_id: recordId }
    });
    return result;
  }

  async create({
    user_id,
    problem_id,
    result,
    language,
    code,
    time
  }: CreateSubmissionInput) {
    const submission = await Submission.create({
      user_id,
      problem_id,
      result: result || 4,
      language,
      code,
      time: time || Date.now()
    });
    return submission;
  }
}
