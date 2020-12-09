import { UrlConstants } from "../../constants/urlConstants";
import { urlCommand } from "../../extensions/urlCommand";
import * as subCommands from "./commands";

export const playbook = urlCommand("playbook", "Open CSE Playbook", UrlConstants.CsePlaybook)
  .addCommands(subCommands)