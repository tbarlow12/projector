import { urlCommand } from "../../../../extensions";
import { ConfigUtils } from "../../../../utils";
import * as subCommands from "./commands";

export const playbookIssues = urlCommand(ConfigUtils.getLink("playbook-issues"))
  .addCommands(subCommands)