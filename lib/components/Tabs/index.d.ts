import React from "react";
import { ScrollViewProps } from "react-native";
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
}
export declare const Tabs: React.NamedExoticComponent<TabsProps>;
