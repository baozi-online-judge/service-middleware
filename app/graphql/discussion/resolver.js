module.exports = {
  Query: {
    async discussions(root, args, ctx) {
      const { ids, extract } = args;
      let result = null;
      if (ids.length && ids.length >= 1) {
        result = await ctx.connector.discussion.fetchByIds(ids);
      } else {
        result = await ctx.connector.discussion.fetchAll();
      }
      if (extract && typeof extract === 'number' && Array.isArray(result)) {
        result.forEach(discussion => {
          if (typeof discussion.setDataValue === 'function') {
            const content =
              typeof discussion.content === 'string'
                ? discussion.content.slice(0, extract)
                : discussion.content;
            discussion.setDataValue('content', content);
          }
        });
      }
      return result;
    }
  }
};
