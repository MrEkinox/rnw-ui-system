import React from "react";
import { SelectFieldProps } from "../SelectField";
export declare type AutocompleteProps = {
    loading?: boolean;
    onSearch?: (value: string) => any;
    value?: string | null;
    solo?: boolean;
    solid?: boolean;
    delay?: number;
    autoFiltering?: boolean;
    onChange?: (newValue: string) => void;
} & Omit<SelectFieldProps, "multiple" | "value" | "onChange" | "searchable">;
export declare const Autocomplete: React.NamedExoticComponent<React.PropsWithChildren<AutocompleteProps>>;
