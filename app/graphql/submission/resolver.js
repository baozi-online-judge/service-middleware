module.exports = {
  Query: {
    async relatedSubmissions(root, args, ctx) {
      const { userId } = args;
      if (typeof userId !== 'string') {
        return await ctx.connector.submission.fetchCurrentRelatedSubmission();
      }
      const result = await ctx.connector.submission.fetchRelatedSubmission(
        userId
      );
      return result;
    },
    async detail(root, args, ctx) {
      const { recordId } = args;
      return await ctx.service.submission.fetchById(recordId);
    }
  },
  Mutation: {
    async submitCode(root, args, ctx) {
      const { problem_id, language, code } = args;
      return await ctx.connector.submission.submit({
        problem_id,
        language,
        code
      });
    }
  },
  Result: {
    ACCEPTED: 1,
    WRONG_ANSWER: 2,
    RUNTIME_ERROR: 3,
    WAITING: 4,
    COMPILE_ERROR: 5,
    TIME_LIMIT_EXCEEDED: 6
  }
};
