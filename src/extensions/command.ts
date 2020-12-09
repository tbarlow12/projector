import { Command as CommanderCommand, CommandOptions } from "commander";
import { CseCliConfig } from "../models/config/cliConfig";
import { ConfigService } from "../services";

export class Command extends CommanderCommand {

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  public addCommands(commandImport: any, opts?: CommandOptions): Command {
    const commands: Command[] = Object.values(commandImport);
    commands.forEach(command => this.addCommand(command, opts));
    return this;
  }

  public initialize(initializeAction: (args: string[]) => void): Command {
    initializeAction(this.args);
    return this;
  }

  public execute(action: (config: CseCliConfig, options: any) => Promise<void>|void): Command {
    this.parse();
    const options = this.opts();
    this.action(async () => {
      const config = ConfigService.createFromArgs(options);
      await action(config, options);
    });
    return this;
  }
}