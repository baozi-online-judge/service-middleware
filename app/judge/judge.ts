import { EventEmitter } from 'events';
import Submission from '../model/submission';
import Checker from './checker';

const True = true;

function waitFor(time: number) {
  return new Promise(resolve => {
    setTimeout(resolve, time);
  });
}

// tslint:disable-next-line:no-empty-interface
export interface Task extends Submission {}

export default class JudgeSystem extends EventEmitter {
  queue: Task[] = [];

  get isEmptyQueue() {
    return this.queue.length === 0;
  }

  async run(time: number = 5000) {
    while (True) {
      if (!this.isEmptyQueue) {
        const target = this.queue.pop();
        if (target) {
          await this.judge(target);
        }
      }
      await waitFor(time);
    }
  }

  addTask(task: Task) {
    this.queue.push(task);
  }

  async judge(task: Submission) {
    const problemId = task.dataValues.problem_id;
    if (problemId) {
      const checker: Checker = new Checker(task);
      checker.on(checker.eventName, () => {
        this.emit(checker.eventName, checker.submission);
      });
      checker.on('outcome', () => {
        this.emit('outcome', checker.submission);
      });
      await checker.run();
    }
  }
}
