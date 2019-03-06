module.exports = {
  Query: {
    async user(root, args, ctx) {
      return await ctx.connector.user.fetchById(args.id);
    }
  }
};
