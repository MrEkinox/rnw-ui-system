import React from "react";
import { PressableProps, StyleProp, ViewStyle } from "react-native";
import { Colors } from "../../theme";
export interface ChipProps extends Omit<PressableProps, "style"> {
    color?: Colors;
    size?: "small" | "medium" | "large";
    variant?: "contained" | "outlined" | "text" | "hovered" | "fade";
    style?: StyleProp<ViewStyle>;
    loading?: boolean;
}
export declare const Chip: React.NamedExoticComponent<React.PropsWithChildren<ChipProps>>;
