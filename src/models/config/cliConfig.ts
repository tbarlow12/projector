import { BacklogConfig } from "./backlog";
import { PlaybookConfig } from "./cse";
import { GitHubConfig } from "./github";

export interface CseCliConfig {
  backlog?: BacklogConfig;
  github?: GitHubConfig;
  playbook?: PlaybookConfig
}
