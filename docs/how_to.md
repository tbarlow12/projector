# How To

## Create a project

In order to create a project, you will run [`pjr project init`](./commands.md#pjr-project-init)), but first you need the values shown below depending on the provider you choose to use. This command puts your values into a `projector.json` file that will be used to create the project.

### Azure DevOps

- Agile provider (currently only supports and defaults to 'azdo') (default: "azdo")
- Base URL for your DevOps organization
  - This usually has the format '<https://dev.azure.com/{organization}>'
  - If you are unsure how to create an organization, follow [these guidelines](https://docs.microsoft.com/en-us/azure/devops/organizations/accounts/create-organization?view=azure-devops).
- Desired name for the agile provider project
- DevOps access token
  - Go to 'https://dev.azure.com/{organization}/_usersSettings/tokens' to generate a token

### Github

Currently not supported, but is [in the backlog](https://github.com/projector-cli/projector/issues/14).

## Create a code repo

### Azure DevOps

### Github

## Create a backlog

### Azure DevOps

### JIRA