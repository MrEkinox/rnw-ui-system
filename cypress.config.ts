import path from "path";
import { defineConfig } from "cypress";
import webpack from "webpack";

export default defineConfig({
  video: false,
  trashAssetsBeforeRuns: true,
  component: {
    setupNodeEvents(on, config) {
      require("@bahmutov/cypress-code-coverage/plugin")(on, config);

      return config;
    },
    specPattern: "**/*.spec.tsx",
    devServer: {
      framework: "react",
      bundler: "webpack",
      webpackConfig: {
        mode: "development",
        devtool: false,
        plugins: [new webpack.ProvidePlugin({ React: "react" })],
        module: {
          rules: [
            {
              test: /\.(ts|tsx)$/,
              exclude: [/node_modules/],
              use: {
                loader: "babel-loader",
                options: {
                  presets: [
                    "@babel/preset-flow",
                    "@babel/preset-env",
                    "@babel/preset-typescript",
                    "@babel/preset-react",
                  ],
                  plugins: [
                    "istanbul",
                    ["react-native-web", { commonjs: true }],
                    "@babel/plugin-proposal-class-properties",
                  ],
                },
              },
            },
            {
              test: /\.ttf$/,
              loader: "url-loader",
              include: path.resolve(
                __dirname,
                "../../node_modules/react-native-vector-icons"
              ),
            },
          ],
        },
        resolve: {
          alias: {
            "react-native$": "react-native-web",
            "react-native-svg$": "react-native-svg-web",
          },
          extensions: [".ts", ".tsx", ".js", ".jsx"],
        },
      },
    },
  },
});
