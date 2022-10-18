import React from "react";
import { ViewProps } from "react-native";
import { TypographyProps } from "../Typography";
export interface ListProps extends ViewProps {
    header?: React.ReactNode | string;
    hearderTextProps?: TypographyProps;
    footer?: React.ReactNode | string;
    footerTextProps?: TypographyProps;
}
export declare const List: React.NamedExoticComponent<React.PropsWithChildren<ListProps>>;
