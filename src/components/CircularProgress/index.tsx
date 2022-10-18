import React, { memo, useCallback, useMemo, useState } from "react";
import { Svg, Path, G } from "react-native-svg";
import {
  LayoutChangeEvent,
  StyleProp,
  StyleSheet,
  View,
  ViewProps,
  ViewStyle,
} from "react-native";
import { Colors, useTheme } from "../../theme";

const polarToCartesian = (
  centerX: number,
  centerY: number,
  radius: number,
  angleInDegrees: number
) => {
  const angleInRadians = ((angleInDegrees - 90) * Math.PI) / 180.0;
  return {
    x: centerX + radius * Math.cos(angleInRadians),
    y: centerY + radius * Math.sin(angleInRadians),
  };
};

const createCirclePath = (
  x: number,
  y: number,
  radius: number,
  startAngle: number,
  endAngle: number
) => {
  const start = polarToCartesian(x, y, radius, endAngle * 0.9999);
  const end = polarToCartesian(x, y, radius, startAngle);
  const largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";
  const d = [
    "M",
    start.x,
    start.y,
    "A",
    radius,
    radius,
    0,
    largeArcFlag,
    0,
    end.x,
    end.y,
  ];
  return d.join(" ");
};

export interface CircularProgressProps extends ViewProps {
  color?: Colors;
  value?: number;
  lineCap?: CanvasLineCap;
  strokeWidth?: number;
  maxValue?: number;
}

export const CircularProgress = memo<
  React.PropsWithChildren<CircularProgressProps>
>(
  ({
    value = 50,
    color = "primary",
    lineCap = "round",
    strokeWidth = 10,
    maxValue = 100,
    children,
    ...props
  }) => {
    const theme = useTheme();

    const themeColor = theme.palette[color] || color;
    const disabledColor = theme.palette.disabled;

    const [width, setWidth] = useState(0);

    const clampFill = Math.min(100, Math.max(0, value));

    const currentFillAngle = (360 * clampFill) / maxValue;

    const backgroundCirclePath = useMemo(
      () =>
        createCirclePath(width / 2, width / 2, width / 2 - strokeWidth, 0, 360),
      [strokeWidth, width]
    );

    const fillCirclePath = useMemo(
      () =>
        createCirclePath(
          width / 2,
          width / 2,
          width / 2 - strokeWidth,
          0,
          currentFillAngle
        ),
      [currentFillAngle, strokeWidth, width]
    );

    const contentStyle: StyleProp<ViewStyle> = useMemo(
      () => [styles.container, { padding: strokeWidth * 2 }],
      [strokeWidth]
    );

    const onLayout = useCallback((event: LayoutChangeEvent) => {
      setWidth(event.nativeEvent.layout.width);
    }, []);

    return (
      <View nativeID="circularProgress" {...props} onLayout={onLayout}>
        <Svg width={width} height={width}>
          <G>
            <Path
              d={backgroundCirclePath}
              stroke={disabledColor}
              strokeWidth={strokeWidth}
              strokeLinecap={lineCap}
              fill="transparent"
            />
            {currentFillAngle && (
              <Path
                d={fillCirclePath}
                stroke={themeColor}
                strokeWidth={strokeWidth}
                strokeLinecap={lineCap}
                fill="transparent"
              />
            )}
          </G>
        </Svg>
        {children && <View style={contentStyle}>{children}</View>}
      </View>
    );
  }
);

CircularProgress.displayName = "CircularProgress";

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    overflow: "hidden",
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
  },
});
