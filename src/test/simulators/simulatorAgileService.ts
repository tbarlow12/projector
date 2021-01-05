import { BacklogItem, Project, Sprint } from "../../models";
import { BaseAgileService } from "../../services";
import { ModelSimulator } from "./modelSimulator";

interface MockAgileServiceFunctions {
  createProject?: (project: Project) => Promise<Project>;
  getSprint?: (id: string) => Promise<Sprint>;
  deleteSprint?: (id: string) => Promise<void>;
  getBacklogItems?: (ids: string[]) => Promise<BacklogItem[]>;
  createBacklogItems?: (items: BacklogItem[]) => Promise<BacklogItem[]>;
  deleteBacklogItems?: (ids: string[]) => Promise<void>;
  createProviderSprints?: (sprints: Sprint[]) => Promise<Sprint[]>;
}

export class SimulatorAgileService extends BaseAgileService {
  getBacklogItems: (ids: string[]) => Promise<BacklogItem[]>;
  createBacklogItems: (items: BacklogItem[]) => Promise<BacklogItem[]>;
  deleteBacklogItems: (ids: string[]) => Promise<void>;
  createProject: (project: Project) => Promise<Project>;
  getSprint: (id: string) => Promise<Sprint>;
  createProviderSprints: (sprints: Sprint[]) => Promise<Sprint[]>;
  deleteSprint: (id: string) => Promise<void>;

  constructor(functions: MockAgileServiceFunctions) {
    super(ModelSimulator.createTestConfig().agile!);
    const {
      getBacklogItems,
      createBacklogItems,
      createProviderSprints,
      deleteBacklogItems,
      getSprint,
      deleteSprint,
      createProject,
    } = functions;
    this.getBacklogItems = getBacklogItems || jest.fn();
    this.createBacklogItems = createBacklogItems || jest.fn();
    this.deleteBacklogItems = deleteBacklogItems || jest.fn();
    this.createProviderSprints = createProviderSprints || jest.fn();
    this.getSprint = getSprint || jest.fn();
    this.deleteSprint = deleteSprint || jest.fn();
    this.createProject = createProject || jest.fn();
  }
}
