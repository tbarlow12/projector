import { ProviderConfig } from "../providerConfig";
import { SprintConfig } from "./sprintConfig";

export interface AgileConfig extends ProviderConfig {
  sprints?: SprintConfig;
}
