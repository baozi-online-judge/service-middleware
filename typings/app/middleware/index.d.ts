// This file is created by egg-ts-helper
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportAuth from '../../../app/middleware/auth';

declare module 'egg' {
  interface IMiddleware {
    auth: typeof ExportAuth;
  }
}
