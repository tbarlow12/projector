import { urlCommand } from "../../extensions";
import { Config } from "../../utils";
import * as subCommands from "./commands/issues";

export const playbook = urlCommand(Config.getLink("playbook"))
  .addCommands(subCommands)
