import { Service } from 'egg';
import User from '../model/user';

export default class UserService extends Service {
  async findUsersByIds(ids: string[]): Promise<User[]> {
    const result = await User.findAll({
      where: { user_id: { $in: ids } }
    });
    return result;
  }

  async findAllUsers(): Promise<User[]> {
    return await User.findAll();
  }
}
