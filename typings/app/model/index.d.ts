// This file is created by egg-ts-helper
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportProblem from '../../../app/model/problem';
import ExportSubmission from '../../../app/model/submission';
import ExportUser from '../../../app/model/user';

declare module 'sequelize' {
  interface Sequelize {
    Problem: ReturnType<typeof ExportProblem>;
    Submission: ReturnType<typeof ExportSubmission>;
    User: ReturnType<typeof ExportUser>;
  }
}
