import { Command } from "../extensions";
import { registerProviders } from "../initialization/registerProviders";
import { UserUtils } from "../utils";
import { agile, project, links, playbook } from "./commands";

export const cse = new Command()
  .description("CSE Bootstrap CLI")
  .name("cse")
  .initialize(() => {
    registerProviders();
  })
  .addAsciiArt("CSE")
  .passCommandToAction(false)
  .addCommand(agile)
  .addCommand(links)
  .addCommand(playbook)
  .addCommand(project)
  .printHelp();

cse.help(helpText => {
  return UserUtils.createAsciiArt("CSE").concat("\n", helpText);
});

cse.parse(process.argv);
