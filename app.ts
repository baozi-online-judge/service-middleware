import { IBoot, Application } from 'egg';

export default class AppBoot implements IBoot {
  app: Application;
  constructor(app: Application) {
    this.app = app;
  }
  async didReady() {
    this.app.judger.run(3000);
    console.log('The judger is Running!');
  }
}
