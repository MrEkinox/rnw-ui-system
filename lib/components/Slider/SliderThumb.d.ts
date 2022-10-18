import React from "react";
export interface SliderThumbProps {
    color?: string;
    value: number;
    minValue: number;
    maxValue: number;
    step: number;
    inInteraction?: boolean;
    getLabel?: (value: number) => React.ReactNode | string;
}
export declare const SliderThumb: React.NamedExoticComponent<SliderThumbProps>;
