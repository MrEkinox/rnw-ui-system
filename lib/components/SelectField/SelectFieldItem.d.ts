import { Colors } from "../../theme";
import React from "react";
import { PressableProps } from "react-native";
export interface SelectFieldItemProps extends Omit<PressableProps, "onPress"> {
    selected?: boolean;
    color?: Colors;
    value: string;
    onPress?: (value: string) => void;
}
export declare const SelectFieldItem: React.NamedExoticComponent<React.PropsWithChildren<SelectFieldItemProps>>;
