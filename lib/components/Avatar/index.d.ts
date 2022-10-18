import React from "react";
import { ViewProps } from "react-native";
import { Colors } from "../../theme";
export interface AvatarProps extends ViewProps {
    size?: number;
    variant?: "circular" | "rounded" | "square";
    src?: string | null;
    color?: Colors;
    isOnline?: boolean | null;
}
export declare const Avatar: React.NamedExoticComponent<React.PropsWithChildren<AvatarProps>>;
