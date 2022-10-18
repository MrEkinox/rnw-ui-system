import React from "react";
import { StyleProp, TextInputProps, TextProps, ViewStyle } from "react-native";
import { Colors } from "../../theme";
import { TypographyProps } from "../Typography";
export interface TextFieldHelperProps extends TypographyProps {
    error?: boolean;
}
export declare const TextFieldHelper: React.NamedExoticComponent<React.PropsWithChildren<TextFieldHelperProps>>;
export interface TextFieldLabelProps extends TextProps {
    required?: boolean;
    isActive?: boolean;
    disabled?: boolean;
    height?: number;
    color?: Colors;
    error?: boolean;
}
export declare const TextFieldLabel: React.NamedExoticComponent<React.PropsWithChildren<TextFieldLabelProps>>;
export interface TextFieldProps extends Omit<TextInputProps, "onChange"> {
    disabled?: boolean;
    color?: Colors;
    label?: string;
    startIcon?: React.ReactNode;
    endIcon?: React.ReactNode;
    required?: boolean;
    error?: boolean;
    helperText?: any;
    onChange?: (newValue: string) => void;
    containerStyle?: StyleProp<ViewStyle>;
    autoGrow?: boolean;
    name?: string;
}
export declare const TextField: React.NamedExoticComponent<TextFieldProps>;
