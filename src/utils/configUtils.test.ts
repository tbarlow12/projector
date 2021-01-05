// We will make the assumption that all env vars are set
// when the Config package is imported, since src/index.ts
// loads environment variables from dotenv as its first
// action. If we have a need for more dynamic configuration
// (reloading config to account for newly set env vars), we
// can use `require` and revisit then. However, using `require`
// is not recommended for TypeScript and makes simulating a
// file system difficult in tests since we will then not
// be able to find the `config` module

const envVarValue1 = "env var 1";
const envVarValue2 = "env var 2";
process.env.TEST_CONFIG_ENV_VAR_1 = envVarValue1;
process.env.TEST_CONFIG_ENV_VAR_2 = envVarValue2;

import { ConfigValue } from "../constants";
import { Config } from "./configUtils";

describe("Config Utils", () => {

  it("gets a value from the test configuration json file", () => {
    // Act & Assert
    expect(Config.getValue("test.variable" as ConfigValue)).toEqual("json");
  });

  it("gets a value from the default configuration json file", () => {
    // Act & Assert
    expect(Config.getValue(ConfigValue.PlaybookRepoName)).toEqual("code-with-engineering-playbook");
  });

  it("gets a value from environment variables", () => {
    // Act & Assert
    expect(Config.getValue("test.variable2" as ConfigValue)).toEqual(envVarValue2);
  });

  it("uses environment variable over json file if configured", () => {
    // Act & Assert
    expect(Config.getValue("test.variable1" as ConfigValue)).toEqual(envVarValue1);
  });

  it("gets a default if no configured value", () => {
    // Setup
    const defaulValue = "default";
    
    // Act & Assert
    expect(Config.getValueWithDefault("fake" as ConfigValue, defaulValue)).toEqual(defaulValue);
  });
});
