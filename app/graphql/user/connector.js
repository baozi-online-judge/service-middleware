const Controller = require('egg').Controller;
const DataLoader = require('dataloader');
const jwt = require('jsonwebtoken');

class UserConnector extends Controller {
  constructor(ctx) {
    super(ctx);
    this.loader = new DataLoader(async ids => {
      if (ids.length < 1) {
        throw new Error(`Should get ids but get ${ids}`);
      }
      return await this.ctx.service.user.findUsersByIds(ids);
    });
  }

  async fetchByIds(ids) {
    return this.loader.loadMany(ids);
  }

  async fetchById(id) {
    return this.loader.load(id);
  }

  async fetchAll() {
    return await this.ctx.service.user.findAllUsers();
  }

  async fetchCurrent() {
    const userId = this.ctx.session.user_id;
    if (userId) {
      return await this.fetchById(userId);
    }
    return null;
  }

  async login({ user_id, password, remember_me }) {
    const user = await this.ctx.service.user.login({ user_id, password });
    if (user) {
      this.ctx.session.user_id = user.user_id;
      const token = jwt.sign(
        { user_id: user.user_id },
        this.config.jwt.jwtSecret,
        {
          expiresIn: this.config.jwt.jwtExpire
        }
      );
      this.ctx.cookies.set('token', token, {
        maxAge: 14 * 24 * 3600 * 1000 // 14 days
      });
      if (remember_me) {
        this.ctx.session.maxAge = 30 * 24 * 3600 * 1000; // 30 days
      }
    }
    return user;
  }

  async logout() {
    if (this.ctx.session.user_id) {
      this.ctx.session = null;
      return true;
    }
    return false;
  }

  async register({ user_id, password, nickname, email }) {
    const newUser = await this.ctx.service.user.create({
      user_id,
      password,
      nickname,
      email,
      avatar_url:
        'https://www.easyicon.net/api/resizeApi.php?id=1214127&size=128'
    });
    return newUser;
  }
}

module.exports = UserConnector;
