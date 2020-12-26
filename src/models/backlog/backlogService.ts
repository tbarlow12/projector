import { BacklogItem } from "./backlogItem";
import { Sprint } from "./sprint";

export interface BacklogService {
  createBacklogItems: (items: BacklogItem[]) => Promise<BacklogItem[]>;
  createSprints: (sprint: Sprint[]) => Promise<Sprint[]>;
}
