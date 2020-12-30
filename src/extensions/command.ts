import { Command as CommanderCommand } from "commander";
import { CseCliConfig } from "../models/config/cliConfig";
import { Link } from "../models/general/link";
import { ConfigService } from "../services";
import { urlCommand } from "./urlCommand";
import { UserUtils } from "../utils";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type ActionHandler = (options: any, config: CseCliConfig) => void|Promise<void>;

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
      const options = this.opts();
      const config = ConfigService.createConfig(options);
      this.actions.forEach((action) => {
        action(options, config);
      });
    });
    return this;
  }

  public printHelp(): Command {
    this.addAction(() => {
      console.log(this.helpInformation());
    });
    return this;
  }

  public addAsciiArt(message: string): Command {
    this.addAction(() => {
      console.log(UserUtils.createAsciiArt(message));
    });
    return this;
  }

  public addLinkCommands(links: Link[]): Command {
    links.forEach((link: Link) => this.addCommand(urlCommand(link)));
    return this;
  }
}
