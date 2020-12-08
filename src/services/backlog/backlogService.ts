import { BacklogItem } from "../../models/backlog/backlogItem";
import { Sprint } from "../../models/backlog/sprint";

export interface BacklogService {
  createBacklogItem: (item: BacklogItem) => Promise<BacklogItem>;
  createSprint: (sprint: Sprint) => Promise<Sprint>;
}