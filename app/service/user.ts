import { Service } from 'egg';
import User from '../model/user';

export default class UserService extends Service {
  async find(id: string) {
    const user = await User.findOne({
      where: {
        id
      }
    });
    return user;
  }
}
