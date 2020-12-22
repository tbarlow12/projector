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
    const json = await FileUtils.readJson("file.json");
    expect(json).toEqual({
      name: "jack"
    });
  });

  it("makes directory if not existent", () => {
    const mkdirSpy = jest.spyOn(fs, "mkdirSync");
    FileUtils.mkdirIfNotExists("dir1");
    expect(mkdirSpy).not.toBeCalled();
    mkdirSpy.mockReset();
  });

  it("does not make a directory that exists", () => {
    const mkdirSpy = jest.spyOn(fs, "mkdirSync");
    const newDir = "newDir";
    FileUtils.mkdirIfNotExists(newDir);
    expect(mkdirSpy).toBeCalledWith(newDir);
    mkdirSpy.mockReset();
  });

  it("writes a file", () => {
    const writeFileSpy = jest.spyOn(fs, "writeFileSync");
    const newFile = "new.json";
    const newContent = "my content";
    FileUtils.writeFile(newFile, newContent);
    expect(writeFileSpy).toBeCalledWith(newFile, newContent);
  });
});
