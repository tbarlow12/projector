import { ConfigValue } from "../../constants";
import { ProjectorConfig } from "../../models";
import { Config } from "../../utils";
import { AgileServiceProvider } from "../agile";
import { ConfigService } from "./configService";
import mockFs from "mock-fs";
import { ModelSimulator } from "../../test";

describe("Config Service", () => {
  const existingConfig = ModelSimulator.createTestConfig();

  beforeAll(() => {
    mockFs(
      {
        "cse.json": JSON.stringify(existingConfig),
      },
      { createCwd: true, createTmp: true },
    );
  });

  afterAll(() => {
    mockFs.restore();
  });
  it("creates initial agile config", () => {
    const now = new Date();

    const expectedConfig: ProjectorConfig = {
      agile: {
        providerName: "azdo",
        providerOptions: expect.anything(),
        sprints: {
          lengthOfSprintInDays: Config.getValue(ConfigValue.DefaultSprintLength),
          numberOfSprints: Config.getValue(ConfigValue.DefaultNumberOfSprints),
          startDate: `${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()}`,
          daysBetweenSprints: Config.getValue(ConfigValue.DefaultDaysBetweenSprints),
          sprintIndexStart: Config.getValue(ConfigValue.DefaultSprintStartIndex),
          sprintNamePattern: Config.getValue(ConfigValue.DefaultSprintNamePattern),
        },
      },
      github: {
        personalAccessToken: expect.any(String),
      },
    };

    // Act & Assert
    expect(ConfigService.createInitialConfig({ agileProvider: "azdo" as AgileServiceProvider })).toEqual(
      expectedConfig,
    );
  });

  it("gets existing config with no options specified", () => {
    expect(ConfigService.getExistingConfig()).toEqual(existingConfig);
  });

  it("gets existing config with options specified", () => {
    const githubToken = "myToken";

    expect(
      ConfigService.getExistingConfig({
        githubToken,
      }),
    ).toEqual({
      ...existingConfig,
      github: {
        personalAccessToken: githubToken,
      },
    });
  });

  it("gets default config if config file does not exist", () => {
    expect(
      ConfigService.getExistingConfig({
        configFile: "fakeCse.json",
      }),
    ).toEqual({});
  });

  it("gets default config with options specified if config file does not exist", () => {
    const githubToken = "myToken";

    expect(
      ConfigService.getExistingConfig({
        configFile: "fakeCse.json",
        githubToken,
      }),
    ).toEqual({
      github: {
        personalAccessToken: githubToken,
      },
    });
  });
});
