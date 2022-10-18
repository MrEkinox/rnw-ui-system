import React from "react";
import { ViewProps } from "react-native";
import { Colors } from "../../theme";
export interface DividerProps extends ViewProps {
    orientation?: "horizontal" | "vertical";
    variant?: "fullWidth" | "middle";
    color?: Colors;
}
export declare const Divider: React.NamedExoticComponent<DividerProps>;
