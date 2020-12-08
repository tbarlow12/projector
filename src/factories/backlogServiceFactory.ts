import { BacklogService } from "../services/backlog/backlogService";

export class BacklogServiceFactory {
  private static registry: { [id: string]: BacklogService }

  public static register(id: string, service: BacklogService) {
    this.registry[id] = service;
  }

  public static get(id: string): BacklogService {
    const service = this.registry[id];

    if (!service) {
      throw new Error(`Backlog service ${id} not defined. Options are ${Object.keys(this.registry).join(",")}`);
    }
    return service;
  }
}
