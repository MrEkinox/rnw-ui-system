import React from "react";
import { StyleProp, TextStyle, ViewStyle } from "react-native";
export declare type Colors = "primary" | "secondary" | "error" | "info" | "success" | "warning" | string;
declare type DeepPartial<T> = T extends object ? {
    [P in keyof T]?: DeepPartial<T[P]>;
} : T;
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
export declare type ThemeOptions = DeepPartial<DefaultThemeOptions>;
export declare const ThemeContext: React.Context<DefaultThemeOptions>;
export declare const useTheme: () => DefaultThemeOptions;
export interface ThemeProviderProps {
    mode?: "light" | "dark" | "auto";
    theme?: ThemeOptions;
    style?: StyleProp<ViewStyle>;
    snackbar?: boolean;
}
export declare const ThemeProvider: React.NamedExoticComponent<React.PropsWithChildren<ThemeProviderProps>>;
export {};
