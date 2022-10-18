import React from "react";
import { ButtonProps } from "../Button";
export interface IconButtonProps extends Omit<ButtonProps, "endIcon" | "startIcon" | "loadingIndicator" | "loadingPosition"> {
    variant?: "contained" | "outlined" | "hovered" | "fade";
}
export declare const IconButton: React.NamedExoticComponent<React.PropsWithChildren<IconButtonProps>>;
