import React from "react";
import { TextProps } from "react-native";
import { Colors } from "../../theme";
export declare type TypographyVariant = "body1" | "body2" | "button" | "caption" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "overline" | "subtitle1" | "subtitle2";
export interface TypographyProps extends TextProps {
    align?: "center" | "justify" | "left" | "right";
    gutterBottom?: boolean;
    noWrap?: boolean;
    secondary?: boolean;
    variant?: TypographyVariant;
    color?: "text" | Colors;
    width?: number;
    loading?: boolean;
    vertical?: boolean;
    direction?: "ltr" | "rtl";
}
export declare const Typography: React.NamedExoticComponent<React.PropsWithChildren<TypographyProps>>;
