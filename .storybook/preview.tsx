import React from "react";
import { ThemeProvider } from "../src/theme";

export const decorators = [
  (Story) => (
    <ThemeProvider mode="auto">
      <Story />
    </ThemeProvider>
  ),
];
