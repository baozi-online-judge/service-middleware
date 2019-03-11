const Service = require('egg').Service;
const DataLoader = require('dataloader');

class UserConnector extends Service {
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
}

module.exports = UserConnector;
