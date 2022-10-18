import React, { memo, useMemo } from "react";
import { Card, CardProps } from "../Card";
import { useTheme, Colors } from "../../theme";
import { Typography } from "../Typography";
import ColorJS from "color";
import { Icon } from "../Icon";
import { StyleProp, StyleSheet, View, ViewStyle } from "react-native";
import { renderIcon } from "../../utils";

export interface SnackbarProps extends CardProps {
  color?: Colors;
  message?: string;
  duration?: number;
  icon?: React.ReactNode | boolean;
  position?: "left" | "center" | "right";
  force?: boolean;
}

export const Snackbar = memo<React.PropsWithChildren<SnackbarProps>>(
  ({ color = "#000", icon = true, message, style, children, ...props }) => {
    const theme = useTheme();

    const themeColor = theme.palette[color] || color;
    const fontColor = ColorJS(themeColor).isDark() ? "#FFF" : "#000";

    const iconContent = useMemo(() => {
      if (icon === false) return;

      switch (color) {
        case "success":
          return (
            <Icon type="Ionicons" color={fontColor} name="checkmark-circle" />
          );
        case "error":
          return <Icon type="Ionicons" color={fontColor} name="alert-circle" />;
        case "warning":
          return <Icon type="Ionicons" color={fontColor} name="warning" />;
        case "info":
          return (
            <Icon type="Ionicons" color={fontColor} name="information-circle" />
          );
      }

      if (typeof icon !== "boolean")
        return renderIcon(icon, { color: fontColor });
    }, [color, fontColor, icon]);

    const containerStyle = useMemo(
      (): StyleProp<ViewStyle> => [
        styles.container,
        { backgroundColor: themeColor },
        style,
      ],
      [style, themeColor]
    );

    return (
      <Card style={containerStyle} {...props}>
        {iconContent && <View style={styles.icon}>{iconContent}</View>}
        {typeof message === "string" ? (
          <Typography color={fontColor} variant="subtitle2">
            {message}
          </Typography>
        ) : (
          message
        )}
        {children}
      </Card>
    );
  }
);

Snackbar.displayName = "Snackbar";

const styles = StyleSheet.create({
  icon: {
    marginRight: 10,
  },
  container: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 15,
    paddingVertical: 10,
    width: "fit-content",
  },
});
