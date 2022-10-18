import React from "react";
import { ViewProps } from "react-native";
import { Colors } from "../../theme";
export declare type DefaultSliderProps = {
    minValue: number;
    maxValue: number;
    color?: Colors;
    step?: number;
    marks?: boolean;
    track?: boolean;
    disabled?: boolean;
    getLabel?: (value: number) => React.ReactNode | string;
};
export declare type SingleSliderProps = DefaultSliderProps & {
    value: number;
    onChange: (newValue: any) => void;
};
export declare type MultipleSliderProps = DefaultSliderProps & {
    value: number[];
    onChange: (newValue: any) => void;
};
export declare type SliderProps = (SingleSliderProps | MultipleSliderProps) & ViewProps;
export declare const Slider: React.NamedExoticComponent<SliderProps>;
