import { VMScript } from 'vm2';
import { EventEmitter } from 'events';
import Submission from '../model/submission';
import { Script, createContext } from 'vm';
import { readFileSync } from 'fs';
import { resolve } from 'path';

interface ItInput {
  example_input: string;
  expect_output: string;
}

type TestFn = () => [boolean, any];

class Checker extends EventEmitter {
  submission: Submission;
  script: VMScript | null = null;
  eventName: string;
  constructor(sub: Submission) {
    super();
    this.submission = sub;
    this.eventName = `Sub${sub.dataValues.record_id}`;
  }

  async compile() {
    try {
      this.script = new VMScript(this.submission.dataValues.code!).compile();
    } catch (err) {
      console.error(
        'Failed to compile script.' + this.submission.dataValues.code,
        err
      );
      this.script = null;
      await this.submission.updateAttributes({
        result: 5,
        user_output: String(err)
      });
    }
  }

  async run() {
    await this.compile();
    if (this.script) {
      try {
        const code = this.submission.dataValues.code!;
        if (/while\s*\(true\)/.test(code)) {
          await this.submission.updateAttributes({
            result: 6
          });
        } else {
          const script = new Script(code, {
            timeout: 1000
          });
          const sandbox = Object.create(null);
          const context = createContext(sandbox);
          script.runInContext(context);
          const problemId = this.submission.dataValues.problem!.dataValues!
            .problem_id!;
          const testCode = readFileSync(
            resolve(__dirname, './cases', `${problemId}.js`),
            'utf8'
          );
          const cases: Array<() => Promise<boolean>> = [];
          const testSandBox = createContext(
            Object.assign(
              {},
              {
                it: ({ example_input, expect_output }: ItInput, fn: TestFn) => {
                  cases.push(async () => {
                    const [ isPassed, result ] = fn.call(null);
                    if (!isPassed) {
                      await this.submission.updateAttributes({
                        result: 2,
                        example_input,
                        expect_output,
                        user_output: String(result)
                      });
                    }
                    return isPassed;
                  });
                }
              },
              sandbox
            )
          );
          new Script(testCode).runInContext(testSandBox);
          for (const asyncFn of cases) {
            const isPassed = await asyncFn();
            if (!isPassed) {
              break;
            }
          }
          console.log('testCode: ', testCode);
          console.log(sandbox);
        }
      } catch (err) {
        console.error(
          'Failed to execute script.' + this.submission.dataValues.code,
          err
        );
        await this.submission.updateAttributes({
          result: 3,
          user_output: String(err)
        });
      }
    }
    this.emit(this.eventName, this.submission);
  }
}

export default Checker;
