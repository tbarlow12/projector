module.exports = {
  "collectCoverageFrom": [
    "src/**/*.{js,jsx,ts,tsx}",
    "!src/**/*.d.ts",
    "!src/test/*.ts",
    "!src/cli.ts"
  ],
  "testEnvironment": "node",
  "transform": {
    "^.+\\.(js)$": "babel-jest",
    "^.+\\.(ts)$": "ts-jest",
  },
  "testPathIgnorePatterns": [
    "./lib",
    "./node_modules"
  ],
  "transformIgnorePatterns": [
    "./lib",
    "./node_modules"
  ],
  "moduleFileExtensions": [
    "js",
    "ts",
    "json",
    "node"
  ],
  "setupFilesAfterEnv": [ "./jest.setup.js" ]
};
