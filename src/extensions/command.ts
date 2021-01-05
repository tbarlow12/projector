import chalk from "chalk";
import { Command as CommanderCommand } from "commander";
import figlet from "figlet";
import { createServiceCollection } from "../factories";
import { CseCliConfig, ServiceCollection } from "../models";
import { Link } from "../models/general/link";
import { ConfigService } from "../services";
import { Logger } from "../utils";
import { urlCommand } from "./urlCommand";

export type ActionHandler = (
  serviceCollection: ServiceCollection,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  options: any,
  config: CseCliConfig,
) => void | Promise<void>;

export class Command extends CommanderCommand {
  private actions: ActionHandler[];

  constructor() {
    super();
    this.actions = [];
  }

  public initialize(initializeAction: () => void): Command {
    initializeAction();
    return this;
  }

  public addAction(action: ActionHandler): Command {
    this.actions.push(action);
    this.action(() => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const options: any = this.opts();
      const config = ConfigService.getExistingConfig(options);
      const serviceCollection = createServiceCollection(options);

      this.actions.forEach((action) => {
        action(serviceCollection, options, config);
      });
    });
    return this;
  }

  public printHelp(): Command {
    this.addAction(() => {
      Logger.log(this.helpInformation());
    });
    return this;
  }

  public asciiArt(message: string): Command {
    this.addAction(() => {
      Logger.log(chalk.cyanBright(figlet.textSync(message)));
    });
    return this;
  }

  public addLinkCommands(links: Link[]): Command {
    links.forEach((link: Link) => this.addCommand(urlCommand(link)));
    return this;
  }
}
