import { urlCommand } from "../../../../extensions";
import { Config } from "../../../../utils";
import * as subCommands from "./commands";

export const playbookIssues = urlCommand(Config.getLink("playbook-issues"))
  .addCommands(subCommands)
