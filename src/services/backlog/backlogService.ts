import { BacklogConfig } from "../../models";
import { BacklogItem } from "../../models/backlog/backlogItem";
import { Sprint } from "../../models/backlog/sprint";

export interface BacklogService {
  createBacklogItems: (items: BacklogItem[]) => Promise<BacklogItem[]>;
  createBacklogItem: (item: BacklogItem) => Promise<BacklogItem>;
  createSprint: (sprint: Sprint) => Promise<Sprint>;
}

export abstract class BaseBacklogService implements BacklogService {
  constructor(protected config: BacklogConfig){}
  
  public async createBacklogItems(items: BacklogItem[]): Promise<BacklogItem[]> {
    return await Promise.all(items.map(item => this.createBacklogItem(item)));
  }
  
  abstract createBacklogItem: (item: BacklogItem) => Promise<BacklogItem>;
  abstract createSprint: (sprint: Sprint) => Promise<Sprint>;
}