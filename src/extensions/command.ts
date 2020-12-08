import { Command as CommanderCommand, CommandOptions } from "commander";

export class Command extends CommanderCommand {
  public addCommands(commandImport: any, opts?: CommandOptions): Command {
    const commands: Command[] = Object.values(commandImport);
    commands.forEach(command => this.addCommand(command, opts));
    return this;
  }
}