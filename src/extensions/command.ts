import chalk from "chalk";
import { Command as CommanderCommand } from "commander";
import figlet from "figlet";
import { createServiceCollection } from "../factories";
import { ProjectorConfig, ServiceCollection } from "../models";
import { Link } from "../models/general/link";
import { ConfigService } from "../services";
import { FileStorageService } from "../services/storage";
import { Logger } from "../utils";
import { urlCommand } from "./urlCommand";

export type ActionHandler = (
  serviceCollection: ServiceCollection,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  options: any,
  config: ProjectorConfig,
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

  public addAction(actionHandler: ActionHandler): Command {
    this.actions.push(actionHandler);
    this.action(async () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const options: { [key: string]: any } = this.opts();
      const projectorConfigStorageService = new FileStorageService<ProjectorConfig>(process.cwd());
      const config = await ConfigService.getConfig(projectorConfigStorageService, options);
      const serviceCollection = createServiceCollection(config, projectorConfigStorageService);

      this.actions.forEach(async (action) => {
        await action(serviceCollection, options, config);
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
    links.forEach(async (link: Link) => this.addCommand(await urlCommand(link)));
    return this;
  }

  public toMarkdownDoc(parentCommandPath?: string): string {
    const commandPath = `${parentCommandPath ? parentCommandPath + " " : ""}${this.name()}`;
    let doc = `## \`${commandPath}\`\n\n`;
    doc += "```\n" + this.helpInformation() + "```";

    for (const command of this.commands) {
      if (command instanceof Command) {
        doc += `\n${command.toMarkdownDoc(commandPath)}`;
      }
    }
    return doc;
  }

  public toTableOfContents(parentIndentation?: string, parentCommandPath?: string): string {
    const indentation = parentIndentation !== undefined ? parentIndentation + "  " : "";
    const commandPath = `${parentCommandPath ? parentCommandPath + " " : ""}${this.name()}`;
    const line = "- [`" + commandPath + "`]" + `(#${commandPath.replace(/ /g, "-")}) - ${this.description()}`;
    let toc = indentation + line;
    for (const command of this.commands) {
      if (command instanceof Command) {
        toc += `\n${command.toTableOfContents(indentation, commandPath)}`;
      }
    }
    return toc;
  }
}
