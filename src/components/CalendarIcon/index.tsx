import React, { memo, useMemo } from "react";
import {
  StyleProp,
  StyleSheet,
  TextStyle,
  View,
  ViewProps,
  ViewStyle,
} from "react-native";
import { Colors, useTheme } from "../../theme";
import ColorJS from "color";
import dayjs from "dayjs";
import { Typography } from "../Typography";

export interface CalendarIconProps extends ViewProps {
  size?: number;
  variant?: "circular" | "rounded" | "square";
  color?: Colors;
  date?: Date | string;
}

export const CalendarIcon = memo<CalendarIconProps>(
  ({
    size = 50,
    variant = "rounded",
    date = new Date(),
    color = "primary",
    style,
    ...props
  }) => {
    const theme = useTheme();

    const backgroundColor = theme.palette.background.default;
    const primaryFontColor = theme.palette.text;
    const themeColor = theme.palette[color] || color;
    const secondaryFontColor = ColorJS(themeColor).isDark() ? "#FFF" : "#000";
    const primaryFontSize = size / 3;
    const secondaryFontSize = size / 6;

    const circularPadding = variant === "circular" ? size / 10 : 1;

    const momentDate = dayjs(date);

    const calendarStyle = useMemo((): StyleProp<ViewStyle> => {
      const borderRadius = theme.borderRadius / 1.5;
      if (variant === "rounded") return { borderRadius };
      if (variant === "square") return { borderRadius: 0 };
      return { borderRadius: 900 };
    }, [theme.borderRadius, variant]);

    const containerStyle = useMemo(
      (): StyleProp<ViewStyle> => [
        calendarStyle,
        {
          height: size,
          width: size,
          overflow: "hidden",
          backgroundColor: backgroundColor,
        },
        style,
      ],
      [backgroundColor, calendarStyle, size, style]
    );

    const outlineText = useMemo(
      (): StyleProp<TextStyle> => ({
        paddingTop: circularPadding,
        textAlign: "center",
        padding: 1,
        fontSize: secondaryFontSize,
        backgroundColor: themeColor,
        color: secondaryFontColor,
      }),
      [circularPadding, secondaryFontColor, secondaryFontSize, themeColor]
    );

    const centerText = useMemo(
      (): StyleProp<TextStyle> => ({
        textAlign: "center",
        color: primaryFontColor,
        fontWeight: "normal",
        fontSize: primaryFontSize,
      }),
      [primaryFontColor, primaryFontSize]
    );

    return (
      <View nativeID="calendarIcon" {...props} style={containerStyle}>
        <Typography style={outlineText}>{momentDate.format("dddd")}</Typography>
        <View style={styles.centerContent}>
          <Typography style={centerText}>{momentDate.format("DD")}</Typography>
        </View>
        <Typography style={outlineText}>{momentDate.format("MMMM")}</Typography>
      </View>
    );
  }
);

CalendarIcon.displayName = "CalendarIcon";

const styles = StyleSheet.create({
  centerContent: {
    flex: 1,
    justifyContent: "center",
  },
});
