import React from "react";
import { TextFieldProps } from "../TextField";
import { CountryCode } from "libphonenumber-js";
export interface PhoneFieldProps extends Omit<TextFieldProps, "value" | "onChange"> {
    lang?: "fr" | "en";
    getCountryLabel?: (code: CountryCode) => string;
    defaultCountry?: CountryCode;
    value?: string | null;
    onChange?: (newValue?: string) => void;
}
export declare const PhoneField: React.NamedExoticComponent<PhoneFieldProps>;
