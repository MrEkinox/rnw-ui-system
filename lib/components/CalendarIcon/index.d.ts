import React from "react";
import { ViewProps } from "react-native";
import { Colors } from "../../theme";
export interface CalendarIconProps extends ViewProps {
    size?: number;
    variant?: "circular" | "rounded" | "square";
    color?: Colors;
    date?: Date | string;
}
export declare const CalendarIcon: React.NamedExoticComponent<CalendarIconProps>;
