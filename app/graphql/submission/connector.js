const Controller = require('egg').Controller;
const DataLoader = require('dataloader');

class SubmissionConnector extends Controller {
  constructor(ctx) {
    super(ctx);
    // this.loader = new DataLoader(async ids => {
    //   if (ids.length < 1) {
    //     throw new Error(`Should get ids but get ${ids}`);
    //   }
    //   return await this.ctx.service.problem.findProblemsByIds(ids);
    // });
  }

  async fetchRelatedSubmission(userId) {
    return await this.ctx.service.submission.findRelatedSubmissions(userId);
  }

  async fetchCurrentRelatedSubmission() {
    const userId = this.ctx.session.user_id;
    if (userId) {
      return await this.fetchRelatedSubmission(userId);
    }
    return null;
  }
  async submit({ problem_id, language, code }) {
    const userId = this.ctx.session.user_id;
    if (userId) {
      return await this.ctx.service.submission.create({
        user_id: userId,
        problem_id,
        language,
        code
      });
    }
    return null;
  }
}

module.exports = SubmissionConnector;
