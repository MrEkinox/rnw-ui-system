import React, { memo, useMemo } from "react";
import {
  StyleProp,
  StyleSheet,
  View,
  ViewProps,
  ViewStyle,
} from "react-native";
import { Colors, useTheme } from "../../theme";

export interface DividerProps extends ViewProps {
  orientation?: "horizontal" | "vertical";
  variant?: "fullWidth" | "middle";
  color?: Colors;
}

export const Divider = memo<DividerProps>(
  ({ orientation, variant, style, color = "divider", ...props }) => {
    const theme = useTheme();

    const backgroundColor = theme.palette[color] || color;

    const size = variant === "middle" ? "80%" : "100%";

    const containerStyle: StyleProp<ViewStyle> = useMemo(
      () => [
        { backgroundColor, alignSelf: "center" },
        orientation === "vertical"
          ? { width: StyleSheet.hairlineWidth, height: size }
          : { height: StyleSheet.hairlineWidth, width: size },
        style,
      ],
      [backgroundColor, orientation, size, style]
    );

    return <View {...props} style={containerStyle} />;
  }
);

Divider.displayName = "Divider";
