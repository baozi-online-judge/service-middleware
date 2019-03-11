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
    }
  }
};
