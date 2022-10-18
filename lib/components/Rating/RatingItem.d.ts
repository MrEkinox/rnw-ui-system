import { Colors } from "../../theme";
import React from "react";
import { PressableProps, StyleProp, ViewStyle } from "react-native";
import { IconProps } from "../Icon";
export interface RatingItemProps extends Omit<PressableProps, "style" | "onPress"> {
    iconProps?: IconProps;
    style?: StyleProp<ViewStyle>;
    size?: number;
    color?: Colors;
    value: number;
    onPress?: (value: number) => void;
}
export declare const RatingItem: React.NamedExoticComponent<RatingItemProps>;
