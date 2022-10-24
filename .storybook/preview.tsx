import React from "react";
import { ThemeProvider } from "../src/theme";
import "moment/locale/fr";

export const decorators = [
  (Story) => (
    <ThemeProvider mode="auto">
      <Story />
    </ThemeProvider>
  ),
];
