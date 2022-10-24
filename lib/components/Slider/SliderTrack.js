import { jsx as _jsx } from "react/jsx-runtime";
import { useThemeStyle } from "../../hooks/useThemeStyle";
import { memo, useEffect, useMemo } from "react";
import { Animated } from "react-native";
export const SliderTrack = memo(({ color, values, maxValue, minValue, inInteraction, step }) => {
    const currentMinValue = values.length === 1 ? minValue : Math.min(...values);
    const currentMaxValue = Math.max(0, ...values);
    const maxCurrentValue = inInteraction
        ? currentMaxValue
        : Math.round(currentMaxValue / step) * step;
    const minCurrentValue = inInteraction
        ? currentMinValue
        : Math.round(currentMinValue / step) * step;
    const percentMin = ((minCurrentValue - minValue) * 100) / (maxValue - minValue);
    const percentMax = ((maxCurrentValue - minValue) * 100) / (maxValue - minValue) - percentMin;
    const animateMaxPosition = useMemo(() => new Animated.Value(percentMax), [percentMax]);
    const animateMinPosition = useMemo(() => new Animated.Value(percentMin), [percentMin]);
    useEffect(() => {
        if (inInteraction) {
            animateMaxPosition.setValue(percentMax);
        }
        else {
            Animated.timing(animateMaxPosition, {
                toValue: percentMax,
                duration: 150,
                useNativeDriver: false,
            }).start();
        }
    }, [animateMaxPosition, inInteraction, percentMax]);
    useEffect(() => {
        if (inInteraction) {
            animateMinPosition.setValue(percentMin);
        }
        else {
            Animated.timing(animateMinPosition, {
                toValue: percentMin,
                duration: 150,
                useNativeDriver: false,
            }).start();
        }
    }, [animateMinPosition, inInteraction, percentMin]);
    const style = useThemeStyle((curTheme) => ({
        borderRadius: curTheme.borderRadius,
        position: "absolute",
        height: "100%",
        left: animateMinPosition.interpolate({
            inputRange: [0, 100],
            outputRange: ["0%", "100%"],
        }),
        width: animateMaxPosition.interpolate({
            inputRange: [0, 100],
            outputRange: ["0%", "100%"],
        }),
        backgroundColor: color,
    }), [animateMaxPosition, animateMinPosition, color]);
    return _jsx(Animated.View, { style: style });
});
SliderTrack.displayName = "SliderTrack";
