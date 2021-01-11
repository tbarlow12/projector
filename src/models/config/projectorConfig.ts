import { AgileConfig } from "./agile";
import { GitHubConfig } from "./github";
import { LocalConfig } from "./local";

export interface ProjectorConfig {
  agile?: AgileConfig;
  github?: GitHubConfig;
  local?: LocalConfig;
}
