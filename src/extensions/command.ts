import { Command as CommanderCommand, CommandOptions } from "commander";
import { CseCliConfig } from "../models/config/cliConfig";
import { ConfigService } from "../services";

export class Command extends CommanderCommand {
  public addCommands(commandImport: any, opts?: CommandOptions): Command {
    const commands: Command[] = Object.values(commandImport);
    commands.forEach(command => this.addCommand(command, opts));
    return this;
  }

  public initialize(initializeAction: (args: string[]) => void): Command {
    initializeAction(this.args);
    return this;
  }

  public execute(action: (config: CseCliConfig) => Promise<void>|void): Command {
    this.action(async (args: any[]) => {
      const config = ConfigService.createFromArgs(args);
      await action(config);
    });
    return this;
  }
}