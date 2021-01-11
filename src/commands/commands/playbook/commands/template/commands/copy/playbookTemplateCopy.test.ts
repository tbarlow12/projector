import { CliSimulator, ModelSimulator } from "../../../../../../../test";
import { playbookTemplateCopy } from "./playbookTemplateCopy";
jest.mock("../../../../../../../services");
import { GithubPlaybookService, GitHubRepoService } from "../../../../../../../services";
import { Logger } from "../../../../../../../utils";
import { FileConstants } from "../../../../../../../constants";
import { SimulatedStorageService } from "../../../../../../../services/storage/simulatedStorageService";
import { PlaybookServiceFactory } from "../../../../../../../factories/playbookServiceFactory";
import { PlaybookService } from "../../../../../../../models";

describe("Playbook Template Copy Command", () => {
  const backlogItemTemplate = ModelSimulator.createTestBacklogItemTemplate();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const simulatedStorageService = new SimulatedStorageService<any>();

  const projectorConfig = ModelSimulator.createTestConfig();

  beforeAll(async () => {
    await simulatedStorageService.write(FileConstants.backlogItemsFileName, backlogItemTemplate);
    await simulatedStorageService.write(FileConstants.configFileName, projectorConfig);
    Logger.log = jest.fn();
  });

  it("contains correct number of sub-commands", () => {
    expect(playbookTemplateCopy.commands).toHaveLength(0);
  });

  it("copies a template from the playbook", async () => {
    const repoService = new GitHubRepoService(simulatedStorageService);
    const playbookService: PlaybookService = new GithubPlaybookService(repoService);
    playbookService.downloadTemplate = jest.fn();

    PlaybookServiceFactory.get = jest.fn(() => playbookService);
    const templateName = "templateName";
    const localPath = "localPath";

    await playbookTemplateCopy.parseAsync(
      CliSimulator.createArgs([
        {
          name: "--template-name",
          value: templateName,
        },
        {
          name: "--out-path",
          value: localPath,
        },
      ]),
    );
  });
});
