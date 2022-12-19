import React, { memo, useMemo } from "react";
import {
  StyleProp,
  StyleSheet,
  View,
  ViewProps,
  ViewStyle,
} from "react-native";
import { Colors, useTheme } from "../../theme";
import ColorJS from "color";
import { Typography, TypographyVariant } from "../Typography";
import { computeBorderRadius } from "../../utils";

export interface BadgeProps extends ViewProps {
  size?: number;
  color?: Colors;
  textVariant?: TypographyVariant;
}

export const Badge = memo<React.PropsWithChildren<BadgeProps>>(
  ({ children, size = 5, color = "primary", textVariant, ...props }) => {
    const theme = useTheme();

    const borderRadius = theme.borderRadius;
    const themeColor = theme.palette[color] || color;

    const content = useMemo(() => {
      if (typeof children === "string" || typeof children === "number") {
        const fontColor = ColorJS(themeColor).isDark() ? "#FFF" : "#000";

        return (
          <Typography variant={textVariant} align="center" color={fontColor}>
            {children}
          </Typography>
        );
      }
      return children;
    }, [children, themeColor, textVariant]);

    const style = useMemo(
      (): StyleProp<ViewStyle> => [
        styles.container,
        computeBorderRadius(borderRadius / 2),
        { backgroundColor: themeColor, padding: size },
        props.style,
      ],
      [size, props.style, borderRadius, themeColor]
    );

    return (
      <View nativeID="badge" {...props} style={style}>
        {content}
      </View>
    );
  }
);
Badge.displayName = "Badge";

const styles = StyleSheet.create({
  container: {
    width: "fit-content",
  },
});
