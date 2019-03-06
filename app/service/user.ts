import { Service } from 'egg';
import User from '../model/user';

export default class UserService extends Service {
  async findUsersByIds(ids: string[]): Promise<User[]> {
    const result = await User.findAll({
      where: { id: { $in: ids } }
    });
    return result;
  }
}
