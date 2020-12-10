import { GitHubRepoService } from "./githubRepoService";

describe("GitHub Repo Service", () => {
  const service = new GitHubRepoService();

  it("lists repos for organization", async () => {
    const result = await service.repos("microsoft");
    expect(result.length).toBeTruthy();
  });

  it("gets the latest commit hash", async () => {
    const result = await service.latestCommit("tbarlow12", "cse-cli", "master");
    expect (result).toBeTruthy();
  });

  it("lists contents at path in repo", async () => {
    const root = await service.ls("tbarlow12", "cse-cli");
    expect(root.length).toBeTruthy();

    const src = await service.ls("tbarlow12", "cse-cli", "src");
    expect(src.length).toBeTruthy();
  });

  it("gets the content of a file in the repo", async () => {
    const readme = await service.content("tbarlow12", "cse-cli", "README.md");
    expect(readme).toBeTruthy();
  });
});
