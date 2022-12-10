import { Colors } from "../../theme";
import React from "react";
import { PressableProps, LayoutChangeEvent } from "react-native";
interface TabProps extends Omit<PressableProps, "onPress" | "onLayout"> {
    color?: Colors;
    value: any;
    selected?: boolean;
    size?: number;
    onPress: (value: any) => void;
    onLayout: (value: any, event: LayoutChangeEvent) => void;
}
export declare const Tab: React.NamedExoticComponent<React.PropsWithChildren<TabProps>>;
export {};
