module.exports = {
  root: true,
  plugins: [
    "react",
    "react-hooks",
    "prettier",
    "import",
    "simple-import-sort",
    "jest",
  ],
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:react-hooks/recommended",
    "plugin:prettier/recommended",
  ],
  parser: "@babel/eslint-parser",
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
    "prettier/prettier": "error",
    "simple-import-sort/imports": "error",
    "simple-import-sort/exports": "error",
    "react/prop-types": "off",
    "no-unused-vars": [
      "error",
      { varsIgnorePattern: "^_", argsIgnorePattern: "^_" },
    ],
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
