import { ProviderConfig } from "../providerConfig";
import { SprintConfig } from "./sprintConfig";

export interface BacklogConfig extends ProviderConfig {
  sprints?: SprintConfig;
}
