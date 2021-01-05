import { AgileConfig } from "./agile";
import { PlaybookConfig } from "./cse";
import { GitHubConfig } from "./github";

export interface CseCliConfig {
  agile?: AgileConfig;
  github?: GitHubConfig;
  playbook?: PlaybookConfig;
}
