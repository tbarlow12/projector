import { urlCommand } from "../../../../../../extensions";
import { Config } from "../../../../../../utils";

export const playbookIssuesOpen = urlCommand(Config.getLink("playbook"), "/issues")
  .name("open")
  .description("Open browser with CSE Playbook Issues");
