import { Service } from 'egg';
import User from '../model/user';

export interface LoginInput {
  user_id: string;
  password: string;
}

export interface CreateUserInput extends LoginInput {
  nickname: string;
  email: string;
  avatar_url?: string;
  role: 1 | 2;
}

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

  async login({ user_id, password }: LoginInput): Promise<User | null> {
    const result = await User.findOne({
      where: { user_id, password }
    });
    return result;
  }

  async create({
    user_id,
    password,
    nickname,
    email,
    avatar_url = '',
    role = 2
  }: CreateUserInput) {
    const users = await this.findUsersByIds([ user_id ]);
    if (users.length >= 1) {
      return null;
    }
    const result = await User.create({
      user_id,
      password,
      nickname,
      email,
      avatar_url,
      role
    });
    return result;
  }
}
