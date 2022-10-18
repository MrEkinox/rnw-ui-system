import React from "react";
import { PressableProps, StyleProp, ViewStyle } from "react-native";
import { Colors } from "../../theme";
export interface ButtonProps extends Omit<PressableProps, "style"> {
    color?: Colors;
    disabled?: boolean;
    endIcon?: React.ReactNode;
    startIcon?: React.ReactNode;
    fullWidth?: boolean;
    loading?: boolean;
    loadingIndicator?: React.ReactNode;
    loadingPosition?: "start" | "end" | "center";
    size?: "small" | "medium" | "large";
    variant?: "contained" | "outlined" | "text" | "hovered" | "fade";
    style?: StyleProp<ViewStyle>;
}
export declare const Button: React.NamedExoticComponent<React.PropsWithChildren<ButtonProps>>;
