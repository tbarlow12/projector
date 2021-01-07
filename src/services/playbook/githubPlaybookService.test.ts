import { PlaybookService, RepoItem, RepoItemType, RepoService, TemplateItem } from "../../models";
import { ServiceSimulator } from "../../test";
import { GithubPlaybookService } from "./githubPlaybookService";

describe("CSE Playbook Service", () => {
  let repoService: RepoService;
  let service: PlaybookService;

  const duplicateName = "duplicate";
  const missingName = "missing";
  const templateName = "template";

  const projectorName = "projector.templates";

  const templateOne: TemplateItem = { name: duplicateName, fileName: "", filePath: "" };
  const templateTwo: TemplateItem = { name: templateName, fileName: "", filePath: "" };
  const templates: TemplateItem[] = [templateOne, { ...templateOne }, templateTwo];

  const projectorFile: RepoItem = {
    name: projectorName,
    type: RepoItemType.File,
    path: "",
    content: JSON.stringify(templates),
  };

  beforeEach(() => {
    repoService = {
      ...ServiceSimulator.createTestRepoService(),
      getRepoItem: jest.fn((owner, repo, name) => {
        if (templates.find((template) => template.name === name)) {
          const repoItem: RepoItem = {
            name: name ?? "",
            type: RepoItemType.File,
            path: "",
            content: JSON.stringify(templates[0]),
          };
          return Promise.resolve(repoItem);
        }
        if (name === projectorFile.name) {
          return Promise.resolve(projectorFile);
        }
        return Promise.reject();
      }),
      downloadRepoItem: jest.fn(),
    };
    service = new GithubPlaybookService(repoService);
  });

  it("gets templates", async () => {
    const foo = await service.getTemplates();
    expect(foo.length).toBeTruthy();
  });

  it("throws an error when there are no templates for the given name", async () => {
    await expect(service.downloadTemplate(missingName, "")).rejects.toThrow();
  });

  it("throws an error when there are multiple templates for the given name", async () => {
    await expect(service.downloadTemplate(duplicateName, "")).rejects.toThrow();
  });

  it("gets a template when there is one template for the given name", async () => {
    await service.downloadTemplate(templateName, "");
    expect(repoService.downloadRepoItem).toBeCalled();
  });
});
