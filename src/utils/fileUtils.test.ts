import mockFs from "mock-fs";
import { FileUtils } from "./fileUtils";
import fs from "fs";

describe("File Utils", () => {
  beforeAll(() => {
    mockFs({
      dir1: {
        file1: "content"
      },
      "file.json": "{\"name\": \"jack\"}"
    }, { createCwd: true, createTmp: true});
  });

  afterAll(() => {
    mockFs.restore();
  });

  it("parses a JSON file from a file", async () => {
    // Act
    const json = await FileUtils.readJson("file.json");
    
    // Assert
    expect(json).toEqual({
      name: "jack"
    });
  });

  it("makes directory if not existent", () => {
    // Setup
    const mkdirSpy = jest.spyOn(fs, "mkdirSync");
    
    // Act
    FileUtils.mkdirIfNotExists("dir1");
    
    // Assert
    expect(mkdirSpy).not.toBeCalled();

    // Reset
    mkdirSpy.mockReset();
  });

  it("does not make a directory that exists", () => {
    // Setup
    const mkdirSpy = jest.spyOn(fs, "mkdirSync");
    const newDir = "newDir";
    
    // Act
    FileUtils.mkdirIfNotExists(newDir);
    
    // Assert
    expect(mkdirSpy).toBeCalledWith(newDir);
    
    // Reset
    mkdirSpy.mockReset();
  });

  it("writes a file", () => {
    // Setup
    const writeFileSpy = jest.spyOn(fs, "writeFileSync");
    const newFile = "new.json";
    const newContent = "my content";
    
    // Act
    FileUtils.writeFile(newFile, newContent);
    
    // Assert
    expect(writeFileSpy).toBeCalledWith(newFile, newContent);
  });
});
