import { AgileConfig } from "./agile";
import { GitHubConfig } from "./github";

export interface ProjectorConfig {
  agile?: AgileConfig;
  github?: GitHubConfig;
}
