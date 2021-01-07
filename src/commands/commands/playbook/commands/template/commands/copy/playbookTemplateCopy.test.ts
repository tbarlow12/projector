import { CliSimulator } from "../../../../../../../test";
import { playbookTemplateCopy } from "./playbookTemplateCopy";
jest.mock("../../../../../../../services");
import { GithubPlaybookService } from "../../../../../../../services";

describe("Playbook Template Copy Command", () => {
  it("contains correct number of sub-commands", () => {
    expect(playbookTemplateCopy.commands).toHaveLength(0);
  });

  it("copies a template from the playbook", async () => {
    GithubPlaybookService.prototype.downloadTemplate = jest.fn();
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
    expect(GithubPlaybookService.prototype.downloadTemplate).toBeCalledWith(templateName, localPath);
  });
});
