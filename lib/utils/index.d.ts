import { IconProps } from "../components/Icon";
import React from "react";
export declare const renderIcon: (icon: React.ReactNode, iconProps: Omit<IconProps, "name" | "type">) => string | number | boolean | React.ReactFragment | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | null | undefined;
export declare const renderChildren: (children: React.ReactNode, iconProps: Omit<IconProps, "name" | "type">) => (string | number | React.ReactFragment | React.ReactElement<unknown, string | React.JSXElementConstructor<any>>)[] | null | undefined;
export declare const isMobile: boolean;
