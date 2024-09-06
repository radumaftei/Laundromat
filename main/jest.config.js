module.exports = {
  preset: "jest-preset-angular",
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["<rootDir>/src/setup-jest.ts"],
  moduleFileExtensions: ["ts", "html", "js", "json"],
  transform: {
    "^.+\\.(ts|mjs|js|html)$": "jest-preset-angular",
    "^.+\\.scss$": "jest-scss-transform",
  },
  moduleNameMapper: {
    "^.+\\.(css|less|scss|sass)$": "identity-obj-proxy",
    "^.+\\.(html)$": "<rootDir>/jest-empty-module.js",
  },
  transformIgnorePatterns: ["node_modules/(?!.*\\.mjs$)"],
  collectCoverage: true,
  coverageReporters: ["html", "text-summary"],
  coverageDirectory: "coverage/jest",
  collectCoverageFrom: [
    "src/**/*.{js,ts}", // Adjust this pattern to match your source files
    "!src/**/*.spec.{js,ts}", // Exclude test files
    "!src/**/index.{js,ts}", // Exclude index files if necessary
  ],
};
