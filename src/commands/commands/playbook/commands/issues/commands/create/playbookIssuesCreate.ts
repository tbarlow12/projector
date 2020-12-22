import { urlCommand } from "../../../../../../../extensions";
import { Config } from "../../../../../../../utils";

const playbookLink = Config.getLink("playbook");

export const playbookIssueCreate = urlCommand({
  name: "create",
  description: "Create a playbook issue",
  url: `${playbookLink.url}/issues/new/choose`
});
