module.exports = {
  Query: {
    async user(root, args, ctx) {
      const { id } = args;
      return await ctx.connector.user.fetchById(id);
    },
    async users(root, args, ctx) {
      const { ids } = args;
      if (ids.length && ids.length >= 1) {
        return await ctx.connector.user.fetchByIds(ids);
      }
      return await ctx.connector.user.fetchAll();
    },
    async current(root, args, ctx) {
      return await ctx.connector.user.fetchCurrent();
    }
  },
  Mutation: {
    async login(root, args, ctx) {
      const { user_id, password, remember_me } = args;
      return await ctx.connector.user.login({ user_id, password, remember_me });
    },
    async logout(root, args, ctx) {
      return await ctx.connector.user.logout();
    },
    async register(root, args, ctx) {
      const { user_id, password, email, nickname } = args;
      return await ctx.connector.user.register({
        user_id,
        password,
        email,
        nickname
      });
    }
  },
  Role: {
    ADMIN: 1,
    REGULAR: 2
  }
};
