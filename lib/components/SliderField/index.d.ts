import React from "react";
import { TextFieldProps } from "../TextField";
import { SliderProps } from "../Slider";
export declare type SliderFieldProps = Omit<SliderProps, "value"> & Omit<TextFieldProps, "value" | "onChange"> & {
    value?: number | null;
};
export declare const SliderField: React.MemoExoticComponent<({ disabled, value, required, error, minValue, maxValue, color, containerStyle, helperText, onChange, label, ...props }: SliderFieldProps) => JSX.Element>;
