import { ConfigService } from "./configService";

describe("Config Service", () => {
  /* Config Service currently just stubs */
  
  it("creates initial config", () => {
    // Act & Assert
    expect(ConfigService.createInitialConfig({})).toEqual({
      backlog: {
        providerName: "",
        providerOptions: {}
      }
    });
  });

  it("creates config from args", () => {
    // Act & Assert
    expect(ConfigService.createFromArgs({})).toEqual({
      backlog: {
        providerName: "azdo",
        providerOptions: {}
      }
    });
  });
});
