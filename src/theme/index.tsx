import React, { memo, useContext, useMemo } from "react";
import {
  StyleProp,
  TextStyle,
  useColorScheme,
  View,
  ViewStyle,
} from "react-native";
import merge from "deepmerge";
import { createContext } from "react";
import { SnackbarProvider } from "..";

export type Colors =
  | "primary"
  | "secondary"
  | "error"
  | "info"
  | "success"
  | "warning"
  | string;

type DeepPartial<T> = T extends object
  ? {
      [P in keyof T]?: DeepPartial<T[P]>;
    }
  : T;

export interface TypographyOptions {
  fontFamily: string;
  h1: StyleProp<TextStyle>;
  h2: StyleProp<TextStyle>;
  h3: StyleProp<TextStyle>;
  h4: StyleProp<TextStyle>;
  h5: StyleProp<TextStyle>;
  h6: StyleProp<TextStyle>;
  body1: StyleProp<TextStyle>;
  body2: StyleProp<TextStyle>;
  subtitle1: StyleProp<TextStyle>;
  subtitle2: StyleProp<TextStyle>;
  button: StyleProp<TextStyle>;
  caption: StyleProp<TextStyle>;
  overline: StyleProp<TextStyle>;
}

export interface PaletteBackgroundOptions {
  default: string;
  card: string;
}

export interface PaletteOptions {
  divider: string;
  disabled: string;
  primary: string;
  secondary: string;
  success: string;
  error: string;
  warning: string;
  info: string;
  text: string;
  background: PaletteBackgroundOptions;
}

export interface IntlOptions {
  selectField: {
    empty: string;
  };
}

export interface DefaultThemeOptions {
  isDark: boolean;
  intl: IntlOptions;
  typography: TypographyOptions;
  palette: PaletteOptions;
  borderRadius: number;
}

export type ThemeOptions = DeepPartial<DefaultThemeOptions>;

const DefaultLightTheme: DefaultThemeOptions = {
  isDark: false,
  intl: {
    selectField: {
      empty: "Aucun résultat",
    },
  },
  palette: {
    primary: "#3D5AFE",
    secondary: "#7C4DFF",
    success: "#008000",
    error: "#EE0701",
    warning: "#F2BB2E",
    info: "#2196F3",
    text: "#000",
    background: {
      default: "#f5f5f5",
      card: "#FFF",
    },
    disabled: "#bbb9c780",
    divider: "#3D5AFE",
  },
  borderRadius: 10,
  typography: {
    fontFamily: "Nunito, sans-serif",
    h1: {
      fontSize: 96,
      letterSpacing: -0.1,
      fontWeight: "400",
    },
    h2: {
      fontSize: 60,
      letterSpacing: -0.5,
      fontWeight: "400",
    },
    h3: {
      fontSize: 48,
      letterSpacing: 0,
      fontWeight: "400",
    },
    h4: {
      fontSize: 34,
      letterSpacing: 0.25,
      fontWeight: "400",
    },
    h5: {
      fontSize: 24,
      letterSpacing: 0,
      fontWeight: "400",
    },
    h6: {
      fontSize: 20,
      letterSpacing: 0.15,
      fontWeight: "500",
    },
    body1: {
      fontSize: 16,
      letterSpacing: 0.5,
      fontWeight: "400",
    },
    body2: {
      fontSize: 14,
      letterSpacing: 0.25,
      fontWeight: "400",
    },
    subtitle1: {
      fontSize: 16,
      letterSpacing: 0.15,
      fontWeight: "400",
    },
    subtitle2: {
      fontSize: 14,
      letterSpacing: 0.1,
      fontWeight: "500",
    },
    button: {
      fontSize: 14,
      letterSpacing: 1.25,
      fontWeight: "500",
    },
    caption: {
      fontSize: 12,
      letterSpacing: 0.4,
      fontStyle: "normal",
      fontWeight: "400",
    },
    overline: {
      fontSize: 10,
      letterSpacing: 1.5,
      lineHeight: 1,
      fontWeight: "400",
      textTransform: "uppercase",
    },
  },
};

const DefaultDarkTheme: ThemeOptions = {
  isDark: true,
  palette: {
    text: "white",
    background: {
      default: "#0f0f0f",
      card: "#000",
    },
    divider: "#4a4a4a",
  },
};

export const ThemeContext = createContext(DefaultLightTheme);
ThemeContext.displayName = "ThemeContext";

export const useTheme = () => useContext(ThemeContext);

export interface ThemeProviderProps {
  mode?: "light" | "dark" | "auto";
  theme?: ThemeOptions;
  style?: StyleProp<ViewStyle>;
}

export const ThemeProvider = memo<React.PropsWithChildren<ThemeProviderProps>>(
  ({ children, mode = "auto", theme, ...props }) => {
    const deviceThemeMode = useColorScheme();

    const combinedTheme: any = useMemo(() => {
      const isDarkMode =
        mode === "dark" || (mode === "auto" && deviceThemeMode === "dark");

      const defaultTheme = merge(
        DefaultLightTheme,
        isDarkMode ? DefaultDarkTheme : {}
      );
      return merge(defaultTheme, theme || {});
    }, [deviceThemeMode, mode, theme]);

    const style = useMemo(
      (): StyleProp<ViewStyle> => [
        {
          backgroundColor: combinedTheme.palette.background?.default,
          minHeight: "100%",
        },
        props.style,
      ],
      [combinedTheme.palette.background?.default, props.style]
    );

    return (
      <ThemeContext.Provider value={combinedTheme}>
        <SnackbarProvider>
          <View style={style}>{children}</View>
        </SnackbarProvider>
      </ThemeContext.Provider>
    );
  }
);

ThemeProvider.displayName = "ThemeProvider";
