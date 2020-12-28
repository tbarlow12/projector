import { AgileConfig } from "./agile";
import { PlaybookConfig } from "./cse";
import { GitHubConfig } from "./github";

export interface CseCliConfig {
  backlog?: AgileConfig;
  github?: GitHubConfig;
  playbook?: PlaybookConfig
}
