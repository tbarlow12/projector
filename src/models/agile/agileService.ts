import { BacklogItem } from "./backlogItem";
import { Project } from "./project";
import { Sprint } from "./sprint";

export interface AgileService {
  // Projects
  
  createProject: (project: Project) => Promise<Project>;
  
  // Backlog Items

  /**
   * Get backlog items from provider
   * 
   * @param {string[]} ids IDs for the backlog items to retrieve
   * @param {boolean|undefined} includeChildren Indicates whether or not to include child backlog items
   * @returns {BacklogItem[]} Backlog items
   */
  getBacklogItems: (ids: string[], includeChildren?: boolean) => Promise<BacklogItem[]>;

  /**
   * Create backlog items
   * 
   * @param {BacklogItem[]} items Backlog items to create
   * @returns {BacklogItem[]} Newly created backlog items with provider ID
   */
  createBacklogItems: (items: BacklogItem[]) => Promise<BacklogItem[]>;

  /**
   * Delete backlog items from provider
   * 
   * @param {string[]} ids IDs for the backlog items to delete
   * @param {boolean|undefined} includeChildren Indicates whether or not to delete child backlog items
   */
  deleteBacklogItems: (ids: string[], includeChildren?: boolean) => Promise<void>;

  // Sprints

  /**
   * Get a sprint by ID
   * 
   * @param {string} id Sprint ID
   * @returns {Sprint} Sprint
   */
  getSprint: (id: string) => Promise<Sprint>;

  /**
   * Create sprints
   * 
   * @param {Sprint[]|undefined} sprints Sprints to create If no sprints provided, uses sprint config
   * @returns {Promise<Sprint[]>} Newly created sprints
   */
  createSprints: (sprints?: Sprint[]) => Promise<Sprint[]>;

  /**
   * Delete a sprint
   * 
   * @param {string} id Sprint ID
   */
  deleteSprint: (id: string) => Promise<void>;
}
