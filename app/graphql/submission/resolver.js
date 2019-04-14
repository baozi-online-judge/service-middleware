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
    WAITING: 4
  }
};
