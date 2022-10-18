import React from "react";
import { ViewProps } from "react-native";
export interface SwitchProps extends ViewProps {
    disabled?: boolean;
    value?: boolean;
    onChange?: (newValue: boolean) => void;
    label?: string;
}
export declare const Switch: React.MemoExoticComponent<({ value, disabled, onChange, style, label, ...props }: SwitchProps) => JSX.Element>;
