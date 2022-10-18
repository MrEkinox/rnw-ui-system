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
import { Typography } from "../Typography";

export interface BadgeProps extends ViewProps {
  size?: number;
  color?: Colors;
}

export const Badge = memo<React.PropsWithChildren<BadgeProps>>(
  ({ children, size = 5, color = "primary", ...props }) => {
    const theme = useTheme();

    const themeColor = theme.palette[color] || color;

    const content = useMemo(() => {
      if (typeof children === "string") {
        const fontColor = ColorJS(themeColor).isDark() ? "#FFF" : "#000";

        return <Typography color={fontColor}>{children}</Typography>;
      }
      return children;
    }, [children, themeColor]);

    const style = useMemo(
      (): StyleProp<ViewStyle> => [
        styles.container,
        { backgroundColor: themeColor, padding: size },
        props.style,
      ],
      [size, props.style, themeColor]
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
    borderRadius: 500,
    width: "fit-content",
  },
});
