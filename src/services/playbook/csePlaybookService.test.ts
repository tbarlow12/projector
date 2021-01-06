import { ConfigValue } from "../../constants";
import { PlaybookService, RepoItem, RepoItemType, RepoService } from "../../models";
import { ServiceSimulator } from "../../test";
import { Config, FileUtils } from "../../utils";
import { CsePlaybookService } from "./csePlaybookService";

describe("CSE Playbook Service", () => {
  let repoService: RepoService;
  let service: PlaybookService;

  beforeEach(() => {
    repoService = ServiceSimulator.createTestRepoService();
    service = new CsePlaybookService(repoService);
  });

  it("gets templates", async () => {
    expect((await service.getTemplates()).length).toBeTruthy();
  });

  it("gets a repo item", async () => {
    const repoPath = "myRepoPath";
    const expectedRepoItem: RepoItem = {
      name: "myName",
      path: repoPath,
      type: RepoItemType.File,
    };

    repoService = {
      ...ServiceSimulator.createTestRepoService(),
      getRepoItem: jest.fn(() => Promise.resolve(expectedRepoItem)),
    };
    service = new CsePlaybookService(repoService);

    const item = await service.getRepoItem(repoPath, true);

    expect(repoService.getRepoItem).toBeCalledWith(
      Config.getValue(ConfigValue.PlaybookOwnerName),
      Config.getValue(ConfigValue.PlaybookRepoName),
      repoPath,
      true,
    );
    expect(item).toEqual(expectedRepoItem);
  });

  it("downloads a repo item", async () => {
    const repoPath = "myRepoPath";
    const content = "myContent";
    const expectedRepoItem: RepoItem = {
      name: "myName",
      path: repoPath,
      type: RepoItemType.File,
      content,
    };
    const outputPath = "myOutputPath";

    repoService = {
      ...ServiceSimulator.createTestRepoService(),
      getRepoItem: jest.fn(() => Promise.resolve(expectedRepoItem)),
    };
    service = new CsePlaybookService(repoService);

    FileUtils.writeFile = jest.fn();

    await service.downloadRepoItem(repoPath, outputPath);

    expect(repoService.getRepoItem).toBeCalledWith(
      Config.getValue(ConfigValue.PlaybookOwnerName),
      Config.getValue(ConfigValue.PlaybookRepoName),
      repoPath,
      true,
    );
    expect(FileUtils.writeFile).toBeCalledWith(outputPath, content);
  });
});
