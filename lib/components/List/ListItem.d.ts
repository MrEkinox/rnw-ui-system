import { ViewProps } from "react-native";
import React from "react";
export interface ListItemProps extends ViewProps {
    disabledPadding?: boolean;
    disableGutters?: boolean;
}
export declare const ListItem: React.NamedExoticComponent<ListItemProps>;
