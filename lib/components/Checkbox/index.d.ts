import React from "react";
import { ViewProps } from "react-native";
import { Colors } from "../../theme";
export interface CheckboxProps extends ViewProps {
    color?: Colors;
    disabled?: boolean;
    value?: boolean;
    onChange?: (newValue: boolean) => void;
    label?: string;
}
export declare const Checkbox: React.NamedExoticComponent<CheckboxProps>;
