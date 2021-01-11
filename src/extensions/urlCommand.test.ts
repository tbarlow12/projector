import { Link } from "../models";
import { urlCommand } from "./urlCommand";
jest.mock("open");
import open from "open";
import { ModelSimulator } from "../test";
import { SimulatedStorageService } from "../services/storage/simulatedStorageService";
import { FileConstants } from "../constants";
import { StorageServiceFactory } from "../factories/storageServiceFactory";

describe("URL Command", () => {
  const projectorConfig = ModelSimulator.createTestConfig();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const storageService = new SimulatedStorageService<any>();

  beforeAll(() => {
    storageService.write(FileConstants.configFileName, projectorConfig);
    StorageServiceFactory.get = jest.fn(() => storageService);
  });

  it("creates a URL command with base path", async () => {
    // Setup
    const link: Link = {
      name: "link",
      description: "my link",
      url: "https://github.com",
    };

    // Act
    urlCommand(link).parse(["node.exe", "index.js", "commandName"]);

    // Assert
    expect(open).toBeCalledWith(link.url);
  });

  it("creates a URL command with additional path", async () => {
    // Setup
    const link: Link = {
      name: "link",
      description: "my link",
      url: "https://github.com",
    };
    const urlPath = "/tbarlow12";

    // Act
    urlCommand(link, urlPath).parse(["node.exe", "index.js", "commandName"]);

    // Assert
    expect(open).toBeCalledWith(`${link.url}${urlPath}`);
  });
});
