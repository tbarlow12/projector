import { Link } from "../models";
import { Command } from "./command";
import mockFs from "mock-fs";
jest.mock("chalk");
import chalk from "chalk";

jest.mock("figlet");
import figlet from "figlet";
import { Logger } from "../utils";

describe("Command", () => {
  beforeAll(() => {
    mockFs(
      {
        "cse.json": "{}",
      },
      { createCwd: true, createTmp: true },
    );
  });

  afterAll(() => {
    mockFs.restore();
  });

  beforeEach(() => {
    Logger.log = jest.fn();
  });

  it("calls initialize action", () => {
    // Setup
    const initializeAction = jest.fn();

    // Act
    new Command().initialize(initializeAction).parse(["node.exe", "index.js", "commandName"]);

    // Assert
    expect(initializeAction).toBeCalled();
  });

  it("executes multiple actions", () => {
    // Setup
    const action1 = jest.fn();
    const action2 = jest.fn();
    const action3 = jest.fn();

    new Command()
      .addAction(action1)
      .addAction(action2)
      .addAction(action3)
      .parse(["node.exe", "index.js", "commandName"]);

    expect(action1).toBeCalled();
    expect(action2).toBeCalled();
    expect(action3).toBeCalled();
  });

  it("executes multiple actions with options", () => {
    // Setup
    const action1 = jest.fn();
    const action2 = jest.fn();
    const action3 = jest.fn();
    const optionValue = "optionValue";

    // Act
    new Command()
      .option("-m, --my-option <my-option>", "My option")
      .addAction(action1)
      .addAction(action2)
      .addAction(action3)
      .parse(["node.exe", "index.js", "commandName", "--my-option", optionValue]);

    // Assert
    const expectedParsedOptions = {
      myOption: optionValue,
    };

    expect(action1).toBeCalledWith(expect.anything(), expectedParsedOptions, expect.anything());
    expect(action2).toBeCalledWith(expect.anything(), expectedParsedOptions, expect.anything());
    expect(action3).toBeCalledWith(expect.anything(), expectedParsedOptions, expect.anything());
  });

  it("prints help information", () => {
    // Act
    new Command().printHelp().parse(["node.exe", "index.js", "commandName"]);

    // Assert
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { calls } = (Logger.log as any).mock;
    expect(calls).toHaveLength(1);
    expect(calls[0][0]).toContain("Options:\n  -h, --help  display help for command");
  });

  it("prints ascii art", () => {
    // Setup
    const originalText = "text";
    const figletText = "figlet text";
    figlet.textSync = jest.fn(() => figletText);
    const chalkText = "chalk text";
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (chalk as any).cyanBright = jest.fn(() => chalkText);

    // Act
    new Command().asciiArt(originalText).parse(["node.exe", "index.js", "commandName"]);

    // Assert
    expect(figlet.textSync).toBeCalledWith(originalText);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    expect((chalk as any).cyanBright).toBeCalledWith(figletText);
    expect(Logger.log).toBeCalledWith(chalkText);
  });

  it("adds link commands", () => {
    // Setup
    const links: Link[] = [1, 2, 3].map((num: number) => {
      return {
        name: `my name ${num}`,
        description: `my description ${num}`,
        url: `https://${num}.com`,
      };
    });

    // Act
    const command = new Command().addLinkCommands(links);

    // Assert
    expect(command.commands).toHaveLength(links.length);
  });
});
