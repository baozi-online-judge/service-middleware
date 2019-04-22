import JudgeSystem from '../judge/judge';
declare module 'egg' {
  export interface Application {
    judger: JudgeSystem;
  }
}
