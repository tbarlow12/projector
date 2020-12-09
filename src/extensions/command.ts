import chalk from "chalk";
import { Command as CommanderCommand, CommandOptions } from "commander";
import { CseCliConfig } from "../models/config/cliConfig";
import { Link } from "../models/general/link";
import { ConfigService } from "../services";
import { urlCommand } from "./urlCommand";
import figlet from "figlet";

export class Command extends CommanderCommand {

  public addCommands(commandImport: any, opts?: CommandOptions): Command {
    const commands: Command[] = Object.values(commandImport);
    commands.forEach((command: Command) => {
      if (!(command && command.name())) {
        return;
      }
      this.addCommand(command);
    });
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

  public addLinkCommands(links: Link[]): Command {
    links.forEach((link: Link) => this.addCommand(urlCommand(link)));
    return this;
  }

  public asciiArt(message: string): Command {
    this.action(() => {
      console.log(chalk.cyanBright(figlet.textSync(message)));
    });
    return this;
  }
}