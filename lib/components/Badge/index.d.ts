import React from "react";
import { ViewProps } from "react-native";
import { Colors } from "../../theme";
import { TypographyVariant } from "../Typography";
export interface BadgeProps extends ViewProps {
    size?: number;
    color?: Colors;
    textVariant?: TypographyVariant;
}
export declare const Badge: React.NamedExoticComponent<React.PropsWithChildren<BadgeProps>>;
