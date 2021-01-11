import { AgileServiceFactory } from "../../../../../../../factories";
import { CliSimulator, SimulatorAgileService } from "../../../../../../../test";
import { playbookTemplateCopy } from "./playbookTemplateCopy";
jest.mock("../../../../../../../services/playbook/csePlaybookService");
import { CsePlaybookService } from "../../../../../../../services/playbook/csePlaybookService";

describe("Playbook Template Copy Command", () => {
  beforeAll(() => {
    AgileServiceFactory.get = jest.fn(() => new SimulatorAgileService({}));
  });

  it("contains correct number of sub-commands", () => {
    expect(playbookTemplateCopy.commands).toHaveLength(0);
  });

  it("copies a template from the playbook", async () => {
    CsePlaybookService.prototype.downloadRepoItem = jest.fn();
    const repoPath = "repoPath";
    const localPath = "localPath";

    await playbookTemplateCopy.parseAsync(
      CliSimulator.createArgs([
        {
          name: "--path",
          value: repoPath,
        },
        {
          name: "--out-path",
          value: localPath,
        },
      ]),
    );
    expect(CsePlaybookService.prototype.downloadRepoItem).toBeCalledWith(repoPath, localPath);
  });
});
