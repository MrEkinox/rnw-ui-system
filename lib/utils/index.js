import React from "react";
import { DeviceInfo } from "react-native-web";
export const renderIcon = (icon, iconProps) => {
    if (React.isValidElement(icon))
        return React.cloneElement(icon, { ...iconProps, ...icon.props });
    return icon;
};
export const renderChildren = (children, iconProps) => React.Children.map(children, (child) => renderIcon(child, iconProps));
export const isMobile = !!(DeviceInfo.userAgent.match(/Android/i) ||
    DeviceInfo.userAgent.match(/webOS/i) ||
    DeviceInfo.userAgent.match(/iPhone/i) ||
    DeviceInfo.userAgent.match(/iPad/i) ||
    DeviceInfo.userAgent.match(/iPod/i) ||
    DeviceInfo.userAgent.match(/BlackBerry/i) ||
    DeviceInfo.userAgent.match(/Windows Phone/i));
