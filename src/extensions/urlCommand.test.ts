import { Link } from "../models";
import { urlCommand } from "./urlCommand";
import mockFs from "mock-fs";
jest.mock("open");
import open from "open";

describe("URL Command", () => {
  beforeAll(() => {
    mockFs({
      "cse.json": "{}"
    }, { createCwd: true, createTmp: true });
  });

  afterAll(() => {
    mockFs.restore();
  });
  
  it("creates a URL command with base path", () => {
    // Setup
    const link: Link = {
      name: "link",
      description: "my link",
      url: "https://github.com",
    };

    // Act
    urlCommand(link)
      .parse(["node.exe", "index.js", "commandName"]);

    
    // Assert
    expect(open).toBeCalledWith(link.url);
  });

  it("creates a URL command with additional path", () => {
    // Setup
    const link: Link = {
      name: "link",
      description: "my link",
      url: "https://github.com",
    };
    const urlPath = "/tbarlow12";

    // Act
    urlCommand(link, urlPath)
      .parse(["node.exe", "index.js", "commandName"]);

    // Assert
    expect(open).toBeCalledWith(`${link.url}${urlPath}`);
  });
});
