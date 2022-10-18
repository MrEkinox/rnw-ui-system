import React from "react";
import { ViewProps } from "react-native";
import { Colors } from "../../theme";
export interface CircularProgressProps extends ViewProps {
    color?: Colors;
    value?: number;
    lineCap?: CanvasLineCap;
    strokeWidth?: number;
    maxValue?: number;
}
export declare const CircularProgress: React.NamedExoticComponent<React.PropsWithChildren<CircularProgressProps>>;
