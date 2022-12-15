import React from "react";
import { ScrollViewProps, StyleProp, ViewStyle } from "react-native";
import { Colors } from "../../theme";
export interface TabItem {
    label: React.ReactNode | string;
    value: any;
}
export interface TabsProps extends ScrollViewProps {
    disabled?: boolean;
    value: any;
    items: TabItem[];
    color?: Colors;
    onChange?: (newValue: any) => void;
    size?: number;
    scrollStyle?: StyleProp<ViewStyle>;
}
export declare const Tabs: React.NamedExoticComponent<TabsProps>;
