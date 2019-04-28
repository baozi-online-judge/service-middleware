// This file is created by egg-ts-helper@1.25.2
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportDiscussion from '../../../app/service/discussion';
import ExportProblem from '../../../app/service/problem';
import ExportSubmission from '../../../app/service/submission';
import ExportTest from '../../../app/service/Test';
import ExportUser from '../../../app/service/user';

declare module 'egg' {
  interface IService {
    discussion: ExportDiscussion;
    problem: ExportProblem;
    submission: ExportSubmission;
    test: ExportTest;
    user: ExportUser;
  }
}
