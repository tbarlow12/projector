import { ConfigService } from "./configService";

describe("Config Service", () => {
  /* Config Service currently just stubs */
  
  it("creates initial config", () => {
    expect(ConfigService.createInitialConfig({})).toEqual({
      backlog: {
        providerName: "",
        providerOptions: {}
      }
    });
  });

  it("creates config from args", () => {
    expect(ConfigService.createFromArgs({})).toEqual({
      backlog: {
        providerName: "azdo",
        providerOptions: {}
      }
    });
  });
});
