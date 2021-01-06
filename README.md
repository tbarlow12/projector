# Projector

[![codecov](https://codecov.io/gh/tbarlow12/cse-cli/branch/master/graph/badge.svg)](https://codecov.io/gh/tbarlow12/cse-cli) [![npm version](https://badge.fury.io/js/cse-cli.svg)](https://badge.fury.io/js/cse-cli) [![Build, Test and Coverage](https://github.com/tbarlow12/cse-cli/workflows/Build,%20Test%20and%20Coverage/badge.svg)](https://github.com/tbarlow12/cse-cli/actions?query=workflow%3A%22Build%2C+Test+and+Coverage%22)

A command-line interface for setting up projects.

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
