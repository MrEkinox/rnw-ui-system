import React from "react";
import { ViewProps } from "react-native";
import { Colors } from "../../theme";
export interface LinearProgressProps extends ViewProps {
    color?: Colors;
    valueBuffer?: number;
    value?: number;
    variant?: "determinate" | "buffer";
}
export declare const LinearProgress: React.NamedExoticComponent<LinearProgressProps>;
