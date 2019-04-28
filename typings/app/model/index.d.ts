// This file is created by egg-ts-helper@1.25.2
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportDiscussion from '../../../app/model/discussion';
import ExportProblem from '../../../app/model/problem';
import ExportSubmission from '../../../app/model/submission';
import ExportUser from '../../../app/model/user';

declare module 'egg' {
  interface IModel {
    Discussion: ReturnType<typeof ExportDiscussion>;
    Problem: ReturnType<typeof ExportProblem>;
    Submission: ReturnType<typeof ExportSubmission>;
    User: ReturnType<typeof ExportUser>;
  }
}
