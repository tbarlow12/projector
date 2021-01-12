# 📽 Projector: The CLI for bootstrapping projects <!-- omit in toc -->

[![codecov](https://codecov.io/gh/tbarlow12/projector/branch/master/graph/badge.svg)](https://codecov.io/gh/tbarlow12/projector) [![npm version](https://badge.fury.io/js/pjr.svg)](https://badge.fury.io/js/pjr) [![Build, Test and Coverage](https://github.com/tbarlow12/projector/workflows/Build,%20Test%20and%20Coverage/badge.svg)](https://github.com/tbarlow12/projector/actions?query=workflow%3A%22Build%2C+Test+and+Coverage%22) [![Bugs](https://sonarcloud.io/api/project_badges/measure?project=tbarlow12_projector&metric=bugs)](https://sonarcloud.io/dashboard?id=tbarlow12_projector) [![Code Smells](https://sonarcloud.io/api/project_badges/measure?project=tbarlow12_projector&metric=code_smells)](https://sonarcloud.io/dashboard?id=tbarlow12_projector) [![Duplicated Lines (%)](https://sonarcloud.io/api/project_badges/measure?project=tbarlow12_projector&metric=duplicated_lines_density)](https://sonarcloud.io/dashboard?id=tbarlow12_projector) [![Lines of Code](https://sonarcloud.io/api/project_badges/measure?project=tbarlow12_projector&metric=ncloc)](https://sonarcloud.io/dashboard?id=tbarlow12_projector) [![Maintainability Rating](https://sonarcloud.io/api/project_badges/measure?project=tbarlow12_projector&metric=sqale_rating)](https://sonarcloud.io/dashboard?id=tbarlow12_projector) [![Reliability Rating](https://sonarcloud.io/api/project_badges/measure?project=tbarlow12_projector&metric=reliability_rating)](https://sonarcloud.io/dashboard?id=tbarlow12_projector) [![Security Rating](https://sonarcloud.io/api/project_badges/measure?project=tbarlow12_projector&metric=security_rating)](https://sonarcloud.io/dashboard?id=tbarlow12_projector) [![Vulnerabilities](https://sonarcloud.io/api/project_badges/measure?project=tbarlow12_projector&metric=vulnerabilities)](https://sonarcloud.io/dashboard?id=tbarlow12_projector)

- [Commands](#commands)
- [Getting Started](#getting-started)
  - [Running CLI from src](#running-cli-from-src)
  - [Running Tests](#running-tests)
- [Installation](#installation)
- [Configuration](#configuration)
- [Build](#build)
- [Test](#test)
- [Run](#run)

## Commands

See the [commands doc](./docs/commands.md) for usage and description of each command.

<!-- COMMAND-TOC-START -->
- [`pjr`](./docs/commands.md#pjr) - Root command for the Projector CLI
  - [`pjr agile`](./docs/commands.md#pjr-agile) - Agile Configuration Management
    - [`pjr agile sprints`](./docs/commands.md#pjr-agile-sprints) - Sprint Management
      - [`pjr agile sprints create`](./docs/commands.md#pjr-agile-sprints-create) - Create Sprints with Agile Provider
    - [`pjr agile work`](./docs/commands.md#pjr-agile-work) - Work Item Management
      - [`pjr agile work create`](./docs/commands.md#pjr-agile-work-create) - Work Item Creation
      - [`pjr agile work template`](./docs/commands.md#pjr-agile-work-template) - Work Item Templates
        - [`pjr agile work template init`](./docs/commands.md#pjr-agile-work-template-init) - Initialize work item template
        - [`pjr agile work template list`](./docs/commands.md#pjr-agile-work-template-list) - List available work item templates
  - [`pjr links`](./docs/commands.md#pjr-links) - Commonly used links in CSE
    - [`pjr links snowball`](./docs/commands.md#pjr-links-snowball) - Track your work in CSE
    - [`pjr links playbook`](./docs/commands.md#pjr-links-playbook) - The Code-With Engineering Playbook
    - [`pjr links playbook-issues`](./docs/commands.md#pjr-links-playbook-issues) - Issues in the Code-With Engineering Playbook
  - [`pjr playbook`](./docs/commands.md#pjr-playbook) - Interacting with the Code-With-Engineering Playbook
    - [`pjr playbook issues`](./docs/commands.md#pjr-playbook-issues) - Interacting with issues in the code-with engineering playbook
      - [`pjr playbook issues create`](./docs/commands.md#pjr-playbook-issues-create) - Create a playbook issue
      - [`pjr playbook issues open`](./docs/commands.md#pjr-playbook-issues-open) - View issues in the code-with engineering playbook
    - [`pjr playbook template`](./docs/commands.md#pjr-playbook-template) - Discover and use templates from the code-with engineering playbook
      - [`pjr playbook template copy`](./docs/commands.md#pjr-playbook-template-copy) - Copy templates from playbook to local working directory
  - [`pjr project`](./docs/commands.md#pjr-project) - Local Projector configuration
    - [`pjr project init`](./docs/commands.md#pjr-project-init) - Initialize local projector configuration
<!-- COMMAND-TOC-END -->

## Getting Started

### Running CLI from src

In the root of the repo, run `npm link` to create a symbolic link in your local npm configuration.
If you'd like to use projector in a separate directory, navigate to that directory and run `npm link projector`.

You will then be able to execute commands with the `pjr` executable inside that directory.

### Running Tests

In order to run tests (both unit and integration), set the environment variables specified in the `.env.sample` file.

The tests have already been configured to read variables from the `.env` file.

## Installation

Run `npm i` at root.

## Configuration

Configuration is located at `src/config`.

## Build

At root, run `npm run build`.

## Test

At root, run `npm run test`.

## Run

Run `pjr` to see the subcommands available.
