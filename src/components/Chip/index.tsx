import React, { memo, useMemo } from "react";
import {
  Pressable,
  PressableProps,
  StyleProp,
  TextStyle,
  ViewStyle,
} from "react-native";
import { Colors, useTheme } from "../../theme";
import ColorJS from "color";
import { Typography } from "../Typography";
import { useHover } from "../../hooks/useHover";

export interface ChipProps extends Omit<PressableProps, "style"> {
  color?: Colors;
  size?: "small" | "medium" | "large";
  variant?: "contained" | "outlined" | "text" | "hovered" | "fade";
  style?: StyleProp<ViewStyle>;
}

export const Chip = memo<React.PropsWithChildren<ChipProps>>(
  ({ children, size, disabled, variant, color = "primary", ...props }) => {
    const theme = useTheme();
    const hover = useHover();

    const borderRadius = theme.borderRadius;
    const themeColor = theme.palette[color] || color;
    const borderWidth = variant === "outlined" ? 2 : 0;

    const containedColor = ColorJS(
      ColorJS(themeColor).isDark() ? "#FFF" : "#000"
    )
      .fade(disabled ? 0.5 : 0)
      .toString();

    const variantStyle: StyleProp<ViewStyle | TextStyle> = useMemo(() => {
      if (variant === "outlined") {
        return {
          color: themeColor,
          borderColor: themeColor,
          borderWidth,
          borderStyle: "solid",
          backgroundColor: hover.isActive
            ? ColorJS(themeColor).fade(0.7).toString()
            : undefined,
        };
      }
      if (variant === "hovered") {
        return {
          color: themeColor,
          backgroundColor: hover.isActive
            ? ColorJS(themeColor).fade(0.7).toString()
            : undefined,
        };
      }
      if (variant === "fade") {
        return {
          color: themeColor,
          opacity: hover.isActive ? 0.5 : 1,
          backgroundColor: ColorJS(themeColor).fade(0.7).toString(),
        };
      }
      if (variant === "text") {
        return {
          color: themeColor,
          opacity: hover.isActive ? 0.5 : 1,
        };
      }
      return {
        backgroundColor: hover.isActive
          ? ColorJS(themeColor).fade(0.2).toString()
          : themeColor,
        color: containedColor,
      };
    }, [borderWidth, containedColor, hover.isActive, themeColor, variant]);

    const content = useMemo(() => {
      if (typeof children === "string") {
        return (
          <Typography color={variantStyle["color"]}>{children}</Typography>
        );
      }
      return children;
    }, [children, variantStyle]);

    const sizeStyle = useMemo((): StyleProp<ViewStyle | TextStyle> => {
      if (variant === "text") return {};

      if (size === "large") {
        return {
          borderRadius,
          paddingHorizontal: 20 - borderWidth,
          paddingVertical: 10 - borderWidth,
          fontSize: 25,
        };
      }
      if (size === "small") {
        return {
          borderRadius: borderRadius / 2,
          paddingHorizontal: 5 - borderWidth,
          paddingVertical: 3 - borderWidth,
          fontSize: 17,
        };
      }
      return {
        borderRadius: borderRadius / 1.5,
        paddingHorizontal: 10 - borderWidth,
        paddingVertical: 5 - borderWidth,
        fontSize: 20,
      };
    }, [borderWidth, borderRadius, variant, size]);

    const style = useMemo(
      (): StyleProp<ViewStyle | TextStyle> => [
        { width: "fit-content" },
        variantStyle,
        sizeStyle,
        props.style,
      ],
      [variantStyle, sizeStyle, props.style]
    );

    return (
      <Pressable
        {...hover.handlers}
        disabled={disabled || !props.onPress}
        nativeID="chip"
        {...props}
        style={style}
      >
        {content}
      </Pressable>
    );
  }
);
Chip.displayName = "Chip";
