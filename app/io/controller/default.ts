import { Controller } from 'egg';

class DefaultController extends Controller {
  async index() {
    const message = this.ctx.args[0];
    await this.ctx.socket.emit('res', `Hi! I've got your message: ${message}`);
  }
}

export default DefaultController;
