# The CSE CLI

[![codecov](https://codecov.io/gh/tbarlow12/cse-cli/branch/master/graph/badge.svg)](https://codecov.io/gh/tbarlow12/cse-cli) [![npm version](https://badge.fury.io/js/cse-cli.svg)](https://badge.fury.io/js/cse-cli) [![Build, Test and Coverage](https://github.com/tbarlow12/cse-cli/workflows/Build,%20Test%20and%20Coverage/badge.svg)](https://github.com/tbarlow12/cse-cli/actions?query=workflow%3A%22Build%2C+Test+and+Coverage%22)

A command-line interface for all things Commercial Software Engineering.

## Getting Started

### Running CLI from src

In the root of the repo, run `npm link` to create a symbolic link in your local npm configuration. Then, in the directory where you want to _use_ the CLI, run `npm link cse-cli`.

You will then be able to execute commands with the `cse` executable inside that directory.

### Running Tests

In order to run tests (both unit and integration), the following environment variables need to be set:

```
GITHUB_TOKEN={GitHub Personal Access Token}
AZURE_DEVOPS_PROJECT_NAME={Name of Azure DevOps Project}
AZURE_DEVOPS_BASE_URL={Azure DevOps Base URL}
AZURE_DEVOPS_ACCESS_TOKEN={AzureDevOps Personal Access Token}
```

The tests have already been configured to read variables from the `.env` file

## Installation

Simply run `npm i` at root.

## Configuration

Configuration is located at `src/config`.

## Build

At root, run `npm run build`.

## Test

At root, run `npm run test`.

## Run

TODO.
