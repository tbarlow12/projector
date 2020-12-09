import chalk from "chalk";
import { Command as CommanderCommand, CommandOptions } from "commander";
import { CseCliConfig } from "../models/config/cliConfig";
import { Link } from "../models/general/link";
import { ConfigService } from "../services";
import { urlCommand } from "./urlCommand";
import figlet from "figlet";

type ActionHandler = () => void|Promise<void>;

export class Command extends CommanderCommand {
  private actions: ActionHandler[];

  constructor() {
    super();
    this.actions = [];
  }

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types 
  public addCommands(commandImport: any, opts?: CommandOptions): Command {
    const commands: Command[] = Object.values(commandImport);
    commands.forEach((command: Command) => {
      if (!(command && command.name())) {
        return;
      }
      this.addCommand(command, opts);
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
    this.addAction(async () => {
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
    this.addAction(() => {
      console.log(chalk.cyanBright(figlet.textSync(message)));
    });
    return this;
  }

  public printHelp(): Command {
    this.addAction(() => {
      console.log(this.helpInformation())
    });
    return this;
  }

  public addAction(action: ActionHandler): Command {
    this.actions.push(action);
    this.action(() => {
      this.actions.forEach((action) => {
        action();
      });
    });
    return this;
  }
}