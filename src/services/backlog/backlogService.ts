import { BacklogConfig, BacklogService } from "../../models";
import { BacklogItem } from "../../models/backlog/backlogItem";
import { Sprint } from "../../models/backlog/sprint";
import { defaultBacklogItems, emptyBacklogItems } from "../../samples";

export abstract class BaseBacklogService implements BacklogService {
  constructor(protected config: BacklogConfig){}
  
  public async createBacklogItems(items: BacklogItem[]): Promise<BacklogItem[]> {
    return await Promise.all(items.map(item => this.createBacklogItem(item)));
  }

  public static createSampleBacklogItems(empty = false): BacklogItem[] {
    return empty ? emptyBacklogItems : defaultBacklogItems
  }
  
  abstract createBacklogItem: (item: BacklogItem) => Promise<BacklogItem>;
  abstract createSprint: (sprint: Sprint) => Promise<Sprint>;
}
