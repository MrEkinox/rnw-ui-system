import React from "react";
import { ViewProps } from "react-native";
import { Colors } from "../../theme";
export interface RadioProps extends ViewProps {
    color?: Colors;
    disabled?: boolean;
    value?: boolean;
    onChange?: (newValue: boolean) => void;
}
export declare const Radio: React.NamedExoticComponent<RadioProps>;
