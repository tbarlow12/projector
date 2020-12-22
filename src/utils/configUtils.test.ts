import { ConfigValue } from "../constants";
import { Config } from "./configUtils";

describe("Config Utils", () => {
  const envVarValue1 = "env var 1";
  const envVarValue2 = "env var 2";

  beforeAll(() => {
    process.env.TEST_CONFIG_ENV_VAR_1 = envVarValue1;
    process.env.TEST_CONFIG_ENV_VAR_2 = envVarValue2;
  });

  it("gets a value from the test configuration json file", () => {
    expect(Config.getValue("test.variable" as ConfigValue)).toEqual("json");
  });

  it("gets a value from the default configuration json file", () => {
    expect(Config.getValue(ConfigValue.PlaybookRepoName)).toEqual("code-with-engineering-playbook");
  });

  it("gets a value from environment variables", () => {
    expect(Config.getValue("test.variable2" as ConfigValue)).toEqual(envVarValue2);
  });

  it("uses environment variable over json file if configured", () => {
    expect(Config.getValue("test.variable1" as ConfigValue)).toEqual(envVarValue1);
  });

  it("gets a default if no configured value", () => {
    const defaulValue = "default";
    expect(Config.getValueWithDefault("fake" as ConfigValue, defaulValue)).toEqual(defaulValue);
  });
});
