import type { StorybookConfig } from "@storybook/core-common";

const config: StorybookConfig = {
  features: { postcss: false },
  typescript: { check: false, reactDocgen: false },
  stories: ["../**/*stories.@(js|jsx|ts|tsx)"],
  framework: "@storybook/react",
  addons: ["@storybook/addon-essentials"],
  webpackFinal: (config) => {
    config.module?.rules?.push({
      test: /\.(ts|tsx)$/,
      resolve: {
        alias: {
          "react-native": "react-native-web",
          "react-native-svg": "react-native-svg-web",
        },
      },
    });
    config.resolve = {
      extensions: [".ts", ".tsx", ".js", ".jsx"],
      alias: {
        "react-native$": "react-native-web",
        "react-native-svg$": "react-native-svg-web",
      },
    };
    return config;
  },
};

export default config;
