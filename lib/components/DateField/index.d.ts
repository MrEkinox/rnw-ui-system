import React from "react";
import { TextFieldProps } from "../TextField";
export declare type DateFieldProps = Omit<TextFieldProps, "value" | "onChange"> & {
    value?: Date | null;
    onChange?: (newValue?: Date | null) => void;
    format?: string;
    maxDate?: Date | null;
    minDate?: Date | null;
};
export declare const NativeDateField: React.NamedExoticComponent<React.PropsWithChildren<DateFieldProps>>;
export declare const DateField: React.NamedExoticComponent<DateFieldProps>;
