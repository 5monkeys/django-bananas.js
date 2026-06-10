module.exports = {
  setupFilesAfterEnv: ["<rootDir>/tests/setup.js"],
  coverageReporters: [
    [
      "text",
      {
        skipFull: true,
      },
    ],
    [
      "cobertura",
      {
        skipFull: true,
      },
    ],
  ],
  testEnvironment: "<rootDir>/tests/jest-environment.js",
  modulePathIgnorePatterns: ["<rootDir>/dist/"],
};
