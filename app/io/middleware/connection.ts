import { Context, Application } from 'egg';
import Submission from '../../model/submission';

export default (app: Application) => {
  return async (ctx: Context, next: any) => {
    ctx.socket.emit('res', 'connected!');
    const handler = (sub: Submission) => {
      // 当评测系统出现结果时，通过Socket向客户端推送该条记录的ID
      const userId = ctx.session.user_id;
      if (userId) {
        ctx.socket.emit(`User_${userId}`, sub.dataValues.record_id);
      }
    };
    app.judger.on('outcome', handler);
    await next();
    console.log('disconnection!!');
  };
};
