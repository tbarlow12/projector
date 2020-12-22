import { GitHubRepoService } from "./githubRepoService";

describe("GitHub Repo Service", () => {
  // Setup
  const service = new GitHubRepoService();

  it("gets the latest commit hash", async () => {
    // Act
    const result = await service.latestCommit("tbarlow12", "cse-cli", "master");
    
    // Assert
    expect (result).toBeTruthy();
  });

  it("gets children from directory in repo", async () => {
    // Act
    const github = await service.getRepoItem("tbarlow12", "cse-cli", ".github");
    
    // Assert
    expect(github.children).toBeDefined();
  }, 60000);
  
  it("gets content from file in repo", async () => {
    // Act
    const readme = await service.getRepoItem("tbarlow12", "cse-cli", "README.md", true);
    
    // Assert
    expect(readme.content).toBeDefined();
  }, 60000);

  it("gets the content of a file in the repo", async () => {
    // Act
    const readme = await service.getRepoItem("tbarlow12", "cse-cli", "README.md");
    
    // Assert
    expect(readme).toBeTruthy();
  });
});
