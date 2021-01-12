import { join } from "path";
process.env.NODE_CONFIG_DIR = join(__dirname, "..", "config");
import { FileUtils, Logger, UserUtils } from "../utils";

/**
 * Get the base URL for the Azure DevOps organization
 *
 * @returns {Promise<string>} Base URL
 */
async function getBaseUrl(): Promise<string> {
  return UserUtils.askQuestionWithDefault(
    "What is your Azure DevOps test instance base url?",
    "https://dev.azure.com/projector-cli",
  );
}

/**
 * Get the name for the Azure DevOps project
 *
 * @returns {Promise<string>} Project name
 */
async function getProjectName(): Promise<string> {
  return UserUtils.askQuestionWithDefault("What is your Azure DevOps test project name?", "projector-dev");
}

/**
 * Get the access token for the Azure DevOps instance
 *
 * @param {string} baseUrl Base URL for Azure DevOps
 * @returns {Promise<string>} Access token
 */
async function getAzDOToken(baseUrl: string): Promise<string> {
  return UserUtils.askQuestion(
    `Please provide an Azure DevOps access token. Go to ${baseUrl}/_userSettings/tokens to create one`,
  );
}

/**
 * Get the GitHub personal access token
 *
 * @returns {Promise<string>} Access token
 */
async function getGitHubToken(): Promise<string> {
  return UserUtils.askQuestion(
    "Please provide a GitHub access token. Go to https://github.com/settings/tokens to create one",
  );
}

/**
 * Creates a .env file in the current working directory
 */
async function createDotenvFile() {
  Logger.log(
    [
      "This script will generate your local .env file required for running tests",
      "Without it, the integration tests will fail\n",
    ].join("\n"),
  );
  const baseUrl = await getBaseUrl();
  const projectName = await getProjectName();
  const azdoToken = await getAzDOToken(baseUrl);
  const githubToken = await getGitHubToken();

  const dotenvContent = [
    `GITHUB_TOKEN=${githubToken}`,
    `AZURE_DEVOPS_PROJECT_NAME=${projectName}`,
    `AZURE_DEVOPS_BASE_URL=${baseUrl}`,
    `AZURE_DEVOPS_ACCESS_TOKEN=${azdoToken}`,
  ].join("\n");
  FileUtils.writeFile(".env", dotenvContent);
}

createDotenvFile();
