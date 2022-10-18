import React from "react";
import { ViewProps } from "react-native";
import { Colors } from "../../theme";
import { IconProps } from "../Icon";
export interface RatingProps extends ViewProps {
    size?: number;
    color?: Colors;
    value?: number;
    spacing?: number;
    onChange?: (newValue: number) => void;
    touchable?: boolean;
    iconProps?: IconProps;
}
export declare const Rating: React.NamedExoticComponent<RatingProps>;
