import { urlCommand } from "../../extensions";
import { ConfigUtils } from "../../utils";
import * as subCommands from "./commands/issues";

export const playbook = urlCommand(ConfigUtils.getLink("playbook"))
  .addCommands(subCommands)