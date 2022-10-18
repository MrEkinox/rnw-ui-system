import React from "react";
export interface SliderTrackProps {
    color?: string;
    values: number[];
    minValue: number;
    maxValue: number;
    step: number;
    inInteraction?: boolean;
}
export declare const SliderTrack: React.NamedExoticComponent<SliderTrackProps>;
