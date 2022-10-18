import { GrowProps } from "../Grow";
import React from "react";
import { FlexAlignType, StyleProp, ViewStyle } from "react-native";
import { CardProps } from "../Card";
export interface PopoverProps extends CardProps {
    parentRef: React.RefObject<any>;
    open?: boolean;
    containerStyle?: StyleProp<ViewStyle>;
    onClose?: () => void;
    arrowEnabled?: boolean;
    arrowPosition?: FlexAlignType;
    animation?: Omit<GrowProps, "visible">;
}
export declare const Popover: React.NamedExoticComponent<React.PropsWithChildren<PopoverProps>>;
