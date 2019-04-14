module.exports = {
  Query: {
    async problems(root, args, ctx) {
      const { ids, extract } = args;
      let result = null;
      if (ids.length && ids.length >= 1) {
        result = await ctx.connector.problem.fetchByIds(ids);
      } else {
        result = await ctx.connector.problem.fetchAll();
      }
      if (extract && typeof extract === 'number' && Array.isArray(result)) {
        result.forEach(problem => {
          if (typeof problem.setDataValue === 'function') {
            const content =
              typeof problem.content === 'string'
                ? problem.content.slice(0, extract)
                : problem.content;
            problem.setDataValue('content', content);
          }
        });
      }
      return result;
    }
  },
  Difficulty: {
    EASY: 1,
    MEDIUM: 2,
    HARD: 3
  }
};
