import React from "react";
import { ThemeProvider } from "../theme";
import "moment/locale/fr";

export const decorators = [
  (Story) => (
    <ThemeProvider mode="auto">
      <Story />
    </ThemeProvider>
  ),
];
