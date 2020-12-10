import { BacklogItem } from "./backlogItem";
import { Sprint } from "./sprint";

export interface BacklogService {
  createBacklogItems: (items: BacklogItem[]) => Promise<BacklogItem[]>;
  createBacklogItem: (item: BacklogItem) => Promise<BacklogItem>;
  createSprint: (sprint: Sprint) => Promise<Sprint>;
}
