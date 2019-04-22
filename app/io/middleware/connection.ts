import { Context } from 'egg';

export default () => {
  return async (ctx: Context, next: any) => {
    ctx.socket.emit('res', 'connected!');
    await next();
    console.log('disconnection!!');
  };
};
