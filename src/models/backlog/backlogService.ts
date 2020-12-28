import { BacklogItem } from "./backlogItem";
import { Sprint } from "./sprint";

export interface BacklogService {
  getSprint: (id: string) => Promise<Sprint>;
  createBacklogItems: (items: BacklogItem[]) => Promise<BacklogItem[]>;
  createSprints: (sprint: Sprint[]) => Promise<Sprint[]>;
  deleteSprint: (id: string) => Promise<void>;
}
