import { ConfigValue } from "../../constants";
import { CseCliConfig } from "../../models";
import { Config } from "../../utils";
import { AgileServiceProvider } from "../agile";
import { ConfigService } from "./configService";

describe("Config Service", () => {
  /* Config Service currently just stubs */
  
  it("creates initial agile config", () => {
    const now = new Date();

    const expectedConfig: CseCliConfig = {
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
    expect(ConfigService.createInitialConfig({agileProvider: "azdo" as AgileServiceProvider})).toEqual(expectedConfig);
  });
});
