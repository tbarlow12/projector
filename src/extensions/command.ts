import chalk from "chalk";
import { Command as CommanderCommand } from "commander";
import figlet from "figlet";
import { CseCliConfig } from "../models/config/cliConfig";
import { Link } from "../models/general/link";
import { ConfigService } from "../services";
import { urlCommand } from "./urlCommand";

export type ActionHandler = (options: any, config: CseCliConfig) => void|Promise<void>;

export class Command extends CommanderCommand {
  private actions: ActionHandler[];

  constructor() {
    super();
    this.actions = [];
  }

  public initialize(initializeAction: (args: string[]) => void): Command {
    initializeAction(this.args);
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
      const options = this.opts();
      const config = ConfigService.createFromArgs(options);
      this.actions.forEach((action) => {
        action(options, config);
      });
    });
    return this;
  }
}
