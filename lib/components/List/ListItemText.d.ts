import { TypographyProps, TypographyVariant } from "../Typography";
import { ViewProps } from "react-native";
import React from "react";
export interface ListItemTextProps extends ViewProps {
    primary?: string | null;
    secondary?: string | null;
    primaryVariant?: TypographyVariant;
    secondaryVariant?: TypographyVariant;
    primaryProps?: TypographyProps;
    secondaryProps?: TypographyProps;
    noWrap?: boolean;
    loading?: boolean;
}
export declare const ListItemText: React.NamedExoticComponent<ListItemTextProps>;
