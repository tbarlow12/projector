import { TypeUtils } from "./typeUtils";
import { GitHubConfig, ProviderConfig } from "../models";

describe("Type Utils", () => {
  it("can determine that an object is of type provider config", () => {
    const providerConfig: ProviderConfig = {
      providerName: "provider",
    };

    expect(TypeUtils.isProviderConfig(providerConfig)).toBe(true);
  });

  it("can determine that an object is not of type provider config", () => {
    const githubConfig: GitHubConfig = {
      personalAccessToken: "token",
    };

    expect(TypeUtils.isProviderConfig(githubConfig)).toBe(false);
    expect(TypeUtils.isProviderConfig({})).toBe(false);
    expect(TypeUtils.isProviderConfig("hello")).toBe(false);
    expect(TypeUtils.isProviderConfig(1)).toBe(false);
    expect(
      TypeUtils.isProviderConfig({
        provider: "test",
      }),
    ).toBe(false);
  });
});
