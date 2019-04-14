// This file is created by egg-ts-helper
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportProblem from '../../../app/service/problem';
import ExportSubmission from '../../../app/service/submission';
import ExportTest from '../../../app/service/Test';
import ExportUser from '../../../app/service/user';

declare module 'egg' {
  interface IService {
    problem: ExportProblem;
    submission: ExportSubmission;
    test: ExportTest;
    user: ExportUser;
  }
}
