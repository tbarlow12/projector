import { urlCommand } from "../../../../../extensions";
import { Config } from "../../../../../utils";

export const playbookOpen = urlCommand(Config.getLink("playbook")).name("open");
