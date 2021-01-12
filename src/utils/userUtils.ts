import { createInterface } from "readline";

export class UserUtils {
  public static async confirmAction(message?: string, affirmative?: string): Promise<boolean> {
    message = `\n${message || "Confirm? (y/n)"}`;
    affirmative = affirmative?.toLowerCase() || "y";
    const response = (await this.askQuestion(message)).trim().toLowerCase();
    return response === affirmative;
  }

  public static askQuestion(question: string): Promise<string> {
    const read = createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    return new Promise((resolve) =>
      read.question(`${question}\n`, (answer: string) => {
        read.close();
        resolve(answer);
      }),
    );
  }

  public static async askQuestionWithDefault(question: string, defaultAnswer: string): Promise<string> {
    const answer = await this.askQuestion(`${question} (enter to use '${defaultAnswer}')`);
    return answer ? answer : defaultAnswer;
  }
}
