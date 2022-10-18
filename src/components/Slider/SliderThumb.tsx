import { Typography } from "../Typography";
import { useTheme } from "../../theme";
import React, { memo, useState, useEffect, useCallback, useMemo } from "react";
import ColorJS from "color";
import {
  Animated,
  LayoutChangeEvent,
  StyleSheet,
  ViewStyle,
} from "react-native";

export interface SliderThumbProps {
  color?: string;
  value: number;
  minValue: number;
  maxValue: number;
  step: number;
  inInteraction?: boolean;
  getLabel?: (value: number) => React.ReactNode | string;
}

export const SliderThumb = memo<SliderThumbProps>(
  ({ color, value, maxValue, minValue, inInteraction, step, getLabel }) => {
    const theme = useTheme();

    const borderColor = theme.palette.background.card;

    const steppedValue = Math.round(value / step) * step;
    const currentValue = inInteraction ? value : steppedValue;
    const [width, setWidth] = useState(0);

    const percent = ((currentValue - minValue) * 100) / (maxValue - minValue);
    const animatePosition = useMemo(
      () => new Animated.Value(percent),
      [percent]
    );

    useEffect(() => {
      if (inInteraction) {
        animatePosition.setValue(percent);
      } else {
        Animated.timing(animatePosition, {
          toValue: percent,
          duration: 150,
          useNativeDriver: false,
        }).start();
      }
    }, [animatePosition, inInteraction, percent]);

    const label = getLabel?.(steppedValue);

    const fontColor = ColorJS(color).isDark() ? "#FFF" : "#000";

    const onLayout = useCallback((event: LayoutChangeEvent) => {
      setWidth(event.nativeEvent.layout.width);
    }, []);

    const style = useMemo(
      (): Animated.WithAnimatedArray<ViewStyle> => [
        styles.container,
        {
          borderColor,
          marginLeft: -(width / 2),
          left: animatePosition.interpolate({
            inputRange: [0, 100],
            outputRange: ["0%", "100%"],
          }),
          backgroundColor: color,
        },
      ],
      [animatePosition, borderColor, color, width]
    );

    return (
      <Animated.View onLayout={onLayout} style={style}>
        {typeof label === "string" || typeof label === "number" ? (
          <Typography color={fontColor} variant="overline" selectable={false}>
            {label}
          </Typography>
        ) : (
          label
        )}
      </Animated.View>
    );
  }
);
SliderThumb.displayName = "SliderThumb";

const styles = StyleSheet.create({
  container: {
    borderRadius: 999,
    alignItems: "center",
    borderStyle: "solid",
    borderWidth: 2,
    padding: 5,
    justifyContent: "center",
    position: "absolute",
  },
});
