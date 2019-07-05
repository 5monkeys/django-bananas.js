const baseRules = require("eslint-config-lydell");

module.exports = {
  root: true,
  plugins: [
    "import",
    "react",
    "react-hooks",
    "prettier",
    "simple-import-sort",
    "jest",
  ],
  parser: "babel-eslint",
  env: { es6: true },
  globals: {
    clearTimeout: false,
    console: false,
    document: false,
    fetch: false,
    setTimeout: false,
    window: false,
  },
  rules: {
    ...baseRules({ import: true, react: true }),
    "prettier/prettier": "error",
    "simple-import-sort/sort": "error",
    "react/prop-types": "off",
  },
  overrides: [
    {
      files: [".*.js", "*.config.js"],
      env: { node: true },
    },
    {
      files: ["*.test.js", "{test,__mocks__}/*.js"],
      env: { node: true, jest: true },
      rules: {
        ...baseRules({ builtin: false, jest: true }),
        "jest/no-truthy-falsy": "off",
      },
    },
    {
      files: ["**/*.js"],
      rules: {
        "import/no-unresolved": ["error", { ignore: ["django-bananas"] }],
        "no-invalid-this": "off",
      },
    },
  ],
  settings: {
    react: {
      version: "detect",
    },
  },
};
