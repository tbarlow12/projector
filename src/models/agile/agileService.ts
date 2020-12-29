import { BacklogItem } from "./backlogItem";
import { Project } from "./project";
import { Sprint } from "./sprint";

export interface AgileService {
  // Projects
  createProject: (project: Project) => Promise<Project>;
  
  // Backlog Items
  getBacklogItems: (ids: string[]) => Promise<BacklogItem[]>;
  createBacklogItems: (items: BacklogItem[]) => Promise<BacklogItem[]>;

  // Sprints

  /**
   * Get a sprint by ID
   * 
   * @param {string} id Sprint ID
   */
  getSprint: (id: string) => Promise<Sprint>;

  /**
   * Create sprints with Agile provider
   * 
   * @param {Sprint[]} sprints Sprints to create If no sprints provided, uses sprint config
   * @returns {Promise<Sprint[]>} Sprints
   */
  createSprints: (sprints?: Sprint[]) => Promise<Sprint[]>;

  /**
   * Delete a sprint
   * 
   * @param {string} id Sprint ID
   */
  deleteSprint: (id: string) => Promise<void>;
}
