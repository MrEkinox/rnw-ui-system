import React from "react";
import { FlatListProps } from "react-native";
import { TextFieldProps } from "../TextField";
export interface SelectFieldItemOptions {
    label: string;
    value: string;
    disabled?: boolean;
    nativeID?: string;
}
export declare type SelectFieldProps<T = any> = {
    value: T;
    onChange?: (newValue?: T) => void;
    multiple?: boolean;
    flatListProps?: Omit<FlatListProps<any>, "data">;
    searchable?: boolean;
    clearText?: string;
    clearable?: boolean;
    items: SelectFieldItemOptions[];
    renderItem?: (item: SelectFieldItemOptions, selected: boolean) => void;
} & Omit<TextFieldProps, "value" | "onChange">;
export declare const NativeSelectField: React.NamedExoticComponent<React.PropsWithChildren<SelectFieldProps<any>>>;
export declare const SelectField: React.NamedExoticComponent<React.PropsWithChildren<SelectFieldProps<any>>>;
