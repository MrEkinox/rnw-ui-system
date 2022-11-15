import { IconProps } from "../components/Icon";
import React from "react";
import { DeviceInfo } from "react-native-web";
import { StyleProp, ViewStyle } from "react-native";

export const renderIcon = (
  icon: React.ReactNode,
  iconProps: Omit<IconProps, "name" | "type">
) => {
  if (React.isValidElement(icon))
    return React.cloneElement(icon, { ...iconProps, ...icon.props });
  return icon;
};

export const renderChildren = (
  children: React.ReactNode,
  iconProps: Omit<IconProps, "name" | "type">
) => React.Children.map(children, (child) => renderIcon(child, iconProps));

export const isMobile = !!(
  DeviceInfo.userAgent.match(/Android/i) ||
  DeviceInfo.userAgent.match(/webOS/i) ||
  DeviceInfo.userAgent.match(/iPhone/i) ||
  DeviceInfo.userAgent.match(/iPad/i) ||
  DeviceInfo.userAgent.match(/iPod/i) ||
  DeviceInfo.userAgent.match(/BlackBerry/i) ||
  DeviceInfo.userAgent.match(/Windows Phone/i)
);

export const computeBorderRadius = (size: number): StyleProp<ViewStyle> => {
  return {
    borderBottomLeftRadius: size,
    borderBottomRightRadius: size,
    borderTopLeftRadius: size,
    borderTopRightRadius: size,
  };
};
