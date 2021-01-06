import { AgileConfig } from "./agile";
import { GitHubConfig } from "./github";

export interface CseCliConfig {
  agile?: AgileConfig;
  github?: GitHubConfig;
}
