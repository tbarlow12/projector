import { Command } from "../extensions";
import { registerProviders } from "../initialization/registerProviders";
import { agile, project, links, playbook } from "./commands";

export const pjr = new Command()
  .description("Projector CLI")
  .name("pjr")
  .initialize(() => {
    registerProviders();
  })
  .asciiArt("PJR")
  .passCommandToAction(false)
  .addCommand(agile)
  .addCommand(links)
  .addCommand(playbook)
  .addCommand(project)
  .printHelp();
