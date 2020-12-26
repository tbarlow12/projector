/* eslint-disable @typescript-eslint/no-explicit-any,@typescript-eslint/explicit-module-boundary-types */
export class Guard {
  public static empty(arg: string, name?: string, message?: string): void {
    if (!arg) {
      throw new Error(message || `Argument '${name}' cannot be empty`);
    }
  }

  public static null(arg: any, name?: string, message?: string): void {
    if (!arg) {
      throw new Error(message || `Argument '${name}' cannot be empty`);
    }
  }

  public static isProviderConfig(config: any): boolean {
    return !!config.providerName;
  }
}
