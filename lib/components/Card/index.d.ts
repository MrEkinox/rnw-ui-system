import React from "react";
import { ViewProps } from "react-native";
import { Colors } from "../../theme";
export interface CardProps extends ViewProps {
    variant?: "elevation" | "outlined" | "blank";
    square?: boolean;
    elevation?: number;
    color?: Colors;
}
export declare const Card: React.NamedExoticComponent<React.PropsWithChildren<CardProps>>;
