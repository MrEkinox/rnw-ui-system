import { useThemeStyle } from "../../hooks/useThemeStyle";
import React, { memo, useCallback, useMemo, useState } from "react";
import {
  LayoutChangeEvent,
  StyleProp,
  Text,
  TextProps,
  View,
  ViewStyle,
} from "react-native";
import { Colors, useTheme } from "../../theme";

export type TypographyVariant =
  | "body1"
  | "body2"
  | "button"
  | "caption"
  | "h1"
  | "h2"
  | "h3"
  | "h4"
  | "h5"
  | "h6"
  | "overline"
  | "subtitle1"
  | "subtitle2";

export interface TypographyProps extends TextProps {
  align?: "center" | "justify" | "left" | "right";
  gutterBottom?: boolean;
  noWrap?: boolean;
  secondary?: boolean;
  variant?: TypographyVariant;
  color?: "text" | Colors;
  defaultWidth?: number;
  loading?: boolean;
  vertical?: boolean;
  direction?: "ltr" | "rtl";
}

export const Typography = memo<React.PropsWithChildren<TypographyProps>>(
  ({
    children,
    align,
    gutterBottom,
    noWrap,
    variant,
    loading,
    secondary,
    defaultWidth,
    vertical,
    direction,
    color = "text",
    ...props
  }) => {
    const theme = useTheme();
    const variantStyle = variant && theme.typography[variant];
    const fontSize = variantStyle?.["fontSize"] || 1;
    const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

    const style = useThemeStyle(
      (curTheme) => {
        const fontFamily = curTheme.typography.fontFamily;
        const fontColor = curTheme.palette[color] || color;
        const disabledColor = curTheme.palette.disabled;

        return [
          loading && {
            width: defaultWidth,
            backgroundColor: disabledColor,
            borderRadius: 5,
          },
          vertical && {
            transform: [{ rotate: direction === "ltr" ? "-90deg" : "90deg" }],
          },
          {
            textDecorationLine: "none",
            color: fontColor,
            fontFamily,
            textAlign: align,
            opacity: secondary ? 0.8 : 1,
            marginBottom: gutterBottom ? fontSize / 4 : undefined,
          },
          noWrap && {
            textOverflow: "ellipsis",
            overflow: "hidden",
            whiteSpace: "nowrap",
          },
          variantStyle,
          props.style,
        ];
      },
      [
        color,
        loading,
        defaultWidth,
        vertical,
        direction,
        align,
        secondary,
        gutterBottom,
        fontSize,
        noWrap,
        variantStyle,
        props.style,
      ]
    );

    const onLayout = useCallback((event: LayoutChangeEvent) => {
      const { width, height } = event.nativeEvent.layout;
      setDimensions({ width, height });
    }, []);

    const verticalStyle = useMemo(
      (): StyleProp<ViewStyle> => ({
        alignItems: "center",
        justifyContent: "center",
        width: dimensions.height || fontSize,
        height: dimensions.width || "100%",
      }),
      [dimensions.height, dimensions.width, fontSize]
    );

    if (vertical) {
      return (
        <View style={verticalStyle}>
          <Text
            onLayout={onLayout}
            ellipsizeMode={noWrap ? "tail" : undefined}
            {...props}
            style={style}
          >
            {children || " "}
          </Text>
        </View>
      );
    }

    return (
      <Text
        ellipsizeMode={noWrap ? "tail" : undefined}
        {...props}
        style={style}
      >
        {children || " "}
      </Text>
    );
  }
);

Typography.displayName = "Typography";
