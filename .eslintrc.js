module.exports = {
  root: true,
  extends: [
    "@react-native-community",
    "eslint:recommended",
    "plugin:react-perf/recommended",
    "plugin:@typescript-eslint/eslint-recommended",
    "plugin:@typescript-eslint/recommended",
  ],
  plugins: ["file-progress", "react-perf/"],
  ignorePatterns: [
    "node_modules/",
    "**/stories.tsx",
    "coverage/",
    "cypress/",
    ".nyc_output/",
    "graphql/",
  ],
  rules: {
    quotes: 0,
    curly: 0,
    "react-perf/jsx-no-jsx-as-prop": "error",
    "@typescript-eslint/no-empty-function": 0,
    "@typescript-eslint/no-explicit-any": 0,
    "dot-notation": 0,
    "@typescript-eslint/ban-ts-comment": 0,
    "@typescript-eslint/no-var-requires": 0,
    "file-progress/activate": 1,
    "react-hooks/exhaustive-deps": [
      "warn",
      { additionalHooks: "(useThemeStyle)" },
    ],
  },
};
