export class Guard {
  public static empty(arg: string, name?: string, message?: string): void {
    if (!arg) {
      throw new Error(message || `Argument '${name}' cannot be empty`);
    }
  }
}
