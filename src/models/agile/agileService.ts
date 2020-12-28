import { SprintConfig } from "../config";
import { BacklogItem } from "./backlogItem";
import { Project } from "./project";
import { Sprint } from "./sprint";

export interface AgileService {
  // Projects
  createProject: (project: Project) => Promise<Project>;
  
  // Backlog Items
  createBacklogItems: (items: BacklogItem[]) => Promise<BacklogItem[]>;

  // Sprints
  getSprint: (id: string) => Promise<Sprint>;
  createSprints: (sprint: Sprint[]) => Promise<Sprint[]>;
  createSprintsFromConfig: () => Promise<Sprint[]>;
  deleteSprint: (id: string) => Promise<void>;
}
