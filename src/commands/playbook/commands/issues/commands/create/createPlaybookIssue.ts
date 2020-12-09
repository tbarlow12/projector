import { urlCommand } from "../../../../../../extensions";
import { ConfigUtils } from "../../../../../../utils";

const playbookLink = ConfigUtils.getLink("playbook");

export const createPlaybookIssue = urlCommand({
  name: "create",
  description: "Create a playbook issue",
  url: `${playbookLink.url}/issues/new/choose`
});