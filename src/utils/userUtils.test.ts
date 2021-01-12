jest.mock("readline");
import readline from "readline";
import { UserUtils } from "./userUtils";

describe("User Utils", () => {
  let questionFn: jest.Mock;
  let closeFn: jest.Mock;

  beforeEach(() => {
    questionFn = jest.fn();
    closeFn = jest.fn();

    readline.createInterface = jest.fn(() => {
      return {
        question: questionFn,
        close: closeFn,
      };
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    }) as any;
  });

  it("asks a question and returns the response", async () => {
    const question = "This is my question";
    const questionPromise = UserUtils.askQuestion(question);
    const calls = questionFn.mock.calls;
    expect(questionFn).toBeCalledWith(`${question}\n`, expect.anything());

    const answer = "This is my answer";
    const answerCallback = calls[0][1];
    answerCallback(answer);
    expect(await questionPromise).toEqual(answer);
    expect(closeFn).toBeCalled();
  });

  it("asks a question with a default response for empty answer", async () => {
    const question = "This is my question";
    const defaultAnswer = "defaultAnswer";
    const questionPromise = UserUtils.askQuestionWithDefault(question, defaultAnswer);
    const calls = questionFn.mock.calls;
    expect(questionFn).toBeCalledWith(`${question} (enter to use '${defaultAnswer}')\n`, expect.anything());

    const answer = "";
    const answerCallback = calls[0][1];
    answerCallback(answer);
    expect(await questionPromise).toEqual(defaultAnswer);
    expect(closeFn).toBeCalled();
  });

  it("confirms an action with default message", async () => {
    const questionPromise = UserUtils.confirmAction();
    const calls = questionFn.mock.calls;
    expect(questionFn).toBeCalledWith("\nConfirm? (y/n)\n", expect.anything());

    const answer = "y";
    const answerCallback = calls[0][1];
    answerCallback(answer);
    expect(await questionPromise).toEqual(true);
    expect(closeFn).toBeCalled();
  });

  it("declines an action with default message", async () => {
    const questionPromise = UserUtils.confirmAction();
    const calls = questionFn.mock.calls;
    expect(questionFn).toBeCalledWith("\nConfirm? (y/n)\n", expect.anything());

    const answer = "n";
    const answerCallback = calls[0][1];
    answerCallback(answer);
    expect(await questionPromise).toEqual(false);
    expect(closeFn).toBeCalled();
  });

  it("confirms an action with custom message and affirmative", async () => {
    const confirmMessage = "This is the confirm message";
    const affirmative = "a";
    const questionPromise = UserUtils.confirmAction(confirmMessage, affirmative);
    const calls = questionFn.mock.calls;
    expect(questionFn).toBeCalledWith(`\n${confirmMessage}\n`, expect.anything());

    const answerCallback = calls[0][1];
    answerCallback(affirmative);
    expect(await questionPromise).toEqual(true);
    expect(closeFn).toBeCalled();
  });

  it("declines an action with custom message and affirmative", async () => {
    const confirmMessage = "This is the confirm message";
    const affirmative = "a";
    const questionPromise = UserUtils.confirmAction(confirmMessage, affirmative);
    const calls = questionFn.mock.calls;
    expect(questionFn).toBeCalledWith(`\n${confirmMessage}\n`, expect.anything());

    const answer = "b";
    const answerCallback = calls[0][1];
    answerCallback(answer);
    expect(await questionPromise).toEqual(false);
    expect(closeFn).toBeCalled();
  });
});
