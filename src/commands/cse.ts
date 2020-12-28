import { Command } from "../extensions";
import { registerProviders } from "../initialization/registerProviders";
import { agile, project, links, playbook } from "./commands";

export const cse = new Command()
  .description("CSE Bootstrap CLI")
  .name("cse")
  .initialize(() => {
    registerProviders();
  })
  .asciiArt("CSE")
  .passCommandToAction(false)
  .addCommand(agile)
  .addCommand(links)
  .addCommand(playbook)
  .addCommand(project)
  .printHelp();
