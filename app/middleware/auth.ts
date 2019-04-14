import { Context } from 'egg';
import { verify } from 'jsonwebtoken';

export default () => {
  return async function auth(ctx: Context, next: () => any) {
    if (ctx.app.config.graphql.graphiql) {
      await next();
      return;
    }
    const token: string = ctx.cookies.get('token');
    if (
      ctx.request.body &&
      (ctx.request.body.operation === 'login' ||
        ctx.request.body.operation === 'register')
    ) {
      await next();
    } else if (ctx.session && ctx.session.user_id && token) {
      try {
        verify(token, ctx.app.config.jwt.jwtSecret, {
          maxAge: ctx.app.config.jwt.jwtExpire
        });
        await next();
      } catch (err) {
        ctx.body = { message: 'Bad token' };
        ctx.status = 401;
      }
    } else {
      ctx.body = { message: 'Please Login' };
      ctx.status = 401;
      return;
    }
  };
};
