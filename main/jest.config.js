// jest.config.js
module.exports = {
  preset: "jest-preset-angular",
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["<rootDir>/src/setup-jest.ts"],
  globalSetup: "jest-preset-angular/global-setup",
  testPathIgnorePatterns: ["/node_modules/", "/dist/", "/e2e/"],
  moduleFileExtensions: ["ts", "html", "js", "json"],
  transform: {
    "^.+\\.(ts|js|html)$": "jest-preset-angular",
  },
  collectCoverage: true,
  coverageReporters: ["html", "text-summary"],
  coverageDirectory: "coverage/jest",
};
