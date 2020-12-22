import { Command } from "../extensions";
import { registerProviders } from "../initialization/registerProviders";
import { backlog, init, links, playbook } from "./commands";

export const root = new Command()
  .description("CSE Bootstrap CLI")
  .name("cse")
  .initialize(() => {
    registerProviders();
  })
  .asciiArt("CSE")
  .passCommandToAction(false)
  .addCommand(backlog)
  .addCommand(init)
  .addCommand(links)
  .addCommand(playbook)
  .printHelp();