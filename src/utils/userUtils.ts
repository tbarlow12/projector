import { createInterface } from "readline";

export class UserUtils {
  public static async confirmAction(message?: string, affirmative?: string): Promise<boolean> {
    message = `\n${message || "Confirm? (y/n)"}\n`;
    affirmative = affirmative || "y";
    const response = (await this.askQuestion(message)).trim().toLowerCase();
    return response === affirmative;
  }

  public static askQuestion(question: string): Promise<string> {
    const read = createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    return new Promise((resolve) =>
      read.question(question, (answer: string) => {
        read.close();
        resolve(answer);
      }),
    );
  }
}
