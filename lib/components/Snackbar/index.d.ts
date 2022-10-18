import React from "react";
import { CardProps } from "../Card";
import { Colors } from "../../theme";
export interface SnackbarProps extends CardProps {
    color?: Colors;
    message?: string;
    duration?: number;
    icon?: React.ReactNode | boolean;
    position?: "left" | "center" | "right";
    force?: boolean;
}
export declare const Snackbar: React.NamedExoticComponent<React.PropsWithChildren<SnackbarProps>>;
