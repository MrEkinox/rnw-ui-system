import React from "react";
import { ViewProps } from "react-native";
export interface FadeProps extends ViewProps {
    enabled?: boolean;
    visible?: boolean;
    duration?: number;
    delay?: number;
    easing?: (value: number) => number;
    onAnimationState?: (state: boolean) => void;
}
export declare const Fade: React.NamedExoticComponent<React.PropsWithChildren<FadeProps>>;
