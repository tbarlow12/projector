export class Logger {
  public static log(message: string): void {
    console.log(message);
  }

  public static logHeader(message: string): void {
    this.log(`\n${message}`);

    let headerLine = "";
    for (let i = 0; i < message.length; i++) {
      headerLine += "-";
    }

    this.log(headerLine);
  }
}
