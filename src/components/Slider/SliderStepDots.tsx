import { useThemeStyle } from "../../hooks/useThemeStyle";
import React, { memo } from "react";
import { View, StyleSheet } from "react-native";

export interface SliderStepDotsProps {
  step: number;
  maxValue: number;
  minValue: number;
}

export const SliderStepDots = memo<SliderStepDotsProps>(
  ({ step, maxValue }) => {
    const dotStyle = useThemeStyle(
      (theme) => [
        styles.dot,
        { backgroundColor: theme.palette.background.card },
      ],
      []
    );

    if (!step) return null;

    return (
      <View style={styles.container}>
        {Array.from({ length: Math.round(maxValue / step) + 1 }).map(
          (_, stepIndex) => (
            <View key={stepIndex} style={dotStyle} />
          )
        )}
      </View>
    );
  }
);
SliderStepDots.displayName = "SliderStepDots";

const styles = StyleSheet.create({
  dot: {
    width: 4,
    height: 4,
    borderRadius: 999,
  },
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    position: "absolute",
    width: "100%",
    padding: 5,
  },
});
