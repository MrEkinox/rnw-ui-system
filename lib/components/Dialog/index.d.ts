import React from "react";
import { StyleProp, ViewProps, ViewStyle } from "react-native";
export interface DialogProps extends ViewProps {
    open?: boolean;
    animationType?: "none" | "slide" | "fade";
    presentationStyle?: "fullScreen" | "pageSheet" | "formSheet" | "overFullScreen";
    onClose?: () => void;
    contentStyle?: StyleProp<ViewStyle>;
    width?: number;
}
export declare const Dialog: React.NamedExoticComponent<React.PropsWithChildren<DialogProps>>;
