import React from "react";
import { ViewProps } from "react-native";
import { Colors } from "../../theme";
export interface BadgeProps extends ViewProps {
    size?: number;
    color?: Colors;
}
export declare const Badge: React.NamedExoticComponent<React.PropsWithChildren<BadgeProps>>;
