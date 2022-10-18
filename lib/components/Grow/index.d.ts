import React from "react";
import { ViewProps } from "react-native";
export interface GrowProps extends ViewProps {
    enabled?: boolean;
    visible?: boolean;
    duration?: number;
    delay?: number;
    transformOrigin?: string;
    easing?: (value: number) => number;
    onAnimationState?: (state: boolean) => void;
}
export declare const Grow: React.NamedExoticComponent<React.PropsWithChildren<GrowProps>>;
