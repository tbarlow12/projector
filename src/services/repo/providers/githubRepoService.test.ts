import { GitHubRepoService } from "./githubRepoService";

describe("GitHub Repo Service", () => {
  const service = new GitHubRepoService();

  it("gets the latest commit hash", async () => {
    const result = await service.latestCommit("tbarlow12", "cse-cli", "master");
    expect (result).toBeTruthy();
  });

  it("gets children from directory in repo", async () => {
    const github = await service.getRepoItem("tbarlow12", "cse-cli", ".github");
    expect(github.children).toBeDefined();
  }, 60000);
  
  it("gets content from file in repo", async () => {
    const readme = await service.getRepoItem("tbarlow12", "cse-cli", "README.md", true);
    expect(readme.content).toBeDefined();
  }, 60000);

  it("gets the content of a file in the repo", async () => {
    const readme = await service.getRepoItem("tbarlow12", "cse-cli", "README.md");
    expect(readme).toBeTruthy();
  });
});
