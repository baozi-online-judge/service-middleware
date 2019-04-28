import { Service } from 'egg';
import Discussion from '../model/discussion';
import Problem from '../model/problem';
import User from '../model/user';

export default class DiscussionService extends Service {
  async fetchById(discussionId: number) {
    const result = await Discussion.findOne({
      where: { discussion_id: discussionId },
      include: [ User, Problem ]
    });
    return result;
  }

  async findAllDiscussions() {
    return await Discussion.findAll({
      include: [ User, Problem ]
    });
  }

  async findDiscussionsByIds(ids: number[]) {
    const result = await Discussion.findAll({
      where: { discussion_id: { $in: ids } },
      include: [ User, Problem ]
    });
    return result;
  }
}
