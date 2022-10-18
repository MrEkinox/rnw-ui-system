import React, { memo, useMemo } from "react";
import { Animated, StyleProp, View, ViewProps, ViewStyle } from "react-native";
import { Colors, useTheme } from "../../theme";
import ColorJS from "color";
import { useEffect } from "react";

export interface LinearProgressProps extends ViewProps {
  color?: Colors;
  valueBuffer?: number;
  value?: number;
  variant?: "determinate" | "buffer";
}

export const LinearProgress = memo<LinearProgressProps>(
  ({ color = "primary", valueBuffer, value, variant, style, ...props }) => {
    const theme = useTheme();
    const valueAnim = useMemo(() => new Animated.Value(0), []);
    const bufferAnim = useMemo(() => new Animated.Value(0), []);

    const themeColor = theme.palette[color] || color;

    const backgroundColor = ColorJS(themeColor).fade(0.8).toString();

    const bufferColor = ColorJS(themeColor).fade(0.6).toString();

    useEffect(() => {
      if (typeof value === "number")
        Animated.timing(valueAnim, {
          toValue: value,
          duration: 200,
          useNativeDriver: false,
        }).start();
    }, [value, valueAnim]);

    useEffect(() => {
      if (typeof valueBuffer === "number")
        Animated.timing(bufferAnim, {
          toValue: valueBuffer,
          duration: 200,
          useNativeDriver: false,
        }).start();
    }, [bufferAnim, valueBuffer]);

    const bufferStyle = useMemo(
      (): Animated.WithAnimatedObject<ViewStyle> => ({
        height: "100%",
        position: "absolute",
        width: bufferAnim.interpolate({
          inputRange: [0, 100],
          outputRange: ["0%", "100%"],
        }),
        backgroundColor: bufferColor,
      }),
      [bufferAnim, bufferColor]
    );

    const progressStyle = useMemo(
      (): Animated.WithAnimatedObject<ViewStyle> => ({
        height: "100%",
        position: "absolute",
        width: valueAnim.interpolate({
          inputRange: [0, 100],
          outputRange: ["0%", "100%"],
        }),
        backgroundColor: themeColor,
      }),
      [themeColor, valueAnim]
    );

    const containerStyle: StyleProp<ViewStyle> = useMemo(
      () => [{ height: 8, backgroundColor }, style],
      [backgroundColor, style]
    );

    return (
      <View {...props} style={containerStyle}>
        {variant === "buffer" && <Animated.View style={bufferStyle} />}
        <Animated.View style={progressStyle} />
      </View>
    );
  }
);

LinearProgress.displayName = "LinearProgress";
