module.exports = {
  root: true,
  extends: ["eslint:recommended", "plugin:react/recommended"],
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
    "prettier/prettier": "error",
    "simple-import-sort/imports": "error",
    "simple-import-sort/exports": "error",
    "react/prop-types": "off",
    "no-unused-vars": ["error", { argsIgnorePattern: "^_" }],
  },
  overrides: [
    {
      files: [".*.js", "*.config.js"],
      env: { node: true },
    },
    {
      files: ["tests/**/*.js", "*.test.js", "{test,__mocks__}/*.js"],
      env: { node: true, jest: true },
      rules: {
        "jest/no-truthy-falsy": "off",
        "react/display-name": "off",
      },
    },
    {
      files: ["**/*.js"],
      rules: {
        "consistent-return": "off",
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
