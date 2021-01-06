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
