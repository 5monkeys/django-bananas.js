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
  testEnvironment: "jsdom",
  modulePathIgnorePatterns: ["<rootDir>/dist/"],
};
