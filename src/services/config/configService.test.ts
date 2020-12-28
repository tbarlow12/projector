import { ConfigValue } from "../../constants";
import { CseCliConfig } from "../../models";
import { Config } from "../../utils";
import { AgileServiceProvider } from "../agile";
import { ConfigService } from "./configService";

describe("Config Service", () => {
  /* Config Service currently just stubs */
  
  it("creates initial backlog config", () => {
    const now = new Date();

    const expectedConfig: CseCliConfig = {
      backlog: {
        providerName: "azdo",
        providerOptions: expect.anything(),
        sprints: {
          lengthOfSprintInDays: Config.getValue(ConfigValue.DefaultSprintLength),
          numberOfSprints: Config.getValue(ConfigValue.DefaultNumberOfSprints),
          startDate: `${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()}`,
        },
      },
      github: {
        personalAccessToken: expect.any(String),
      },
    };

    // Act & Assert
    expect(ConfigService.createInitialConfig({backlogProvider: "azdo" as AgileServiceProvider})).toEqual(expectedConfig);
  });
});
