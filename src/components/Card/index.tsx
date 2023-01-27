import React, { memo, useMemo } from "react";
import { StyleProp, View, ViewProps, ViewStyle } from "react-native";
import { computeBorderRadius } from "../../utils";
import { Colors, useTheme } from "../../theme";

export interface CardProps extends ViewProps {
  variant?: "elevation" | "outlined" | "blank";
  square?: boolean;
  elevation?: number;
  color?: Colors;
}

export const Card = memo<React.PropsWithChildren<CardProps>>(
  ({
    children,
    square,
    variant = "blank",
    elevation = 5,
    color,
    style,
    ...props
  }) => {
    const theme = useTheme();

    const borderRadius = square ? 0 : theme.borderRadius;
    const themeColor = color
      ? theme.palette[color] || color
      : theme.palette.primary;
    const backgroundColor =
      color && variant === "blank" ? themeColor : theme.palette.background.card;

    const outlinedStyle = useMemo((): StyleProp<ViewStyle> => {
      return {
        borderColor: themeColor,
        borderTopWidth: 2,
        borderLeftWidth: 2,
        borderRightWidth: 2,
        borderBottomWidth: 2,
        borderStyle: "solid",
      };
    }, [themeColor]);

    const elevationStyle = useMemo((): StyleProp<ViewStyle> => {
      return {
        shadowColor: themeColor,
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.25,
        shadowRadius: elevation,
      };
    }, [elevation, themeColor]);

    const cardStyle = useMemo(() => {
      if (variant === "elevation") return elevationStyle;

      if (variant === "outlined") return outlinedStyle;
    }, [elevationStyle, variant, outlinedStyle]);

    const containerStyle: StyleProp<ViewStyle> = useMemo(
      () => [
        computeBorderRadius(borderRadius),
        { backgroundColor },
        cardStyle,
        style,
      ],
      [backgroundColor, borderRadius, cardStyle, style]
    );

    return (
      <View nativeID="card" {...props} style={containerStyle}>
        {children}
      </View>
    );
  }
);

Card.displayName = "Card";
