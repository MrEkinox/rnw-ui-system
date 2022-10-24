"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SliderTrack = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const useThemeStyle_1 = require("../../hooks/useThemeStyle");
const react_1 = require("react");
const react_native_1 = require("react-native");
exports.SliderTrack = (0, react_1.memo)(({ color, values, maxValue, minValue, inInteraction, step }) => {
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
    const animateMaxPosition = (0, react_1.useMemo)(() => new react_native_1.Animated.Value(percentMax), [percentMax]);
    const animateMinPosition = (0, react_1.useMemo)(() => new react_native_1.Animated.Value(percentMin), [percentMin]);
    (0, react_1.useEffect)(() => {
        if (inInteraction) {
            animateMaxPosition.setValue(percentMax);
        }
        else {
            react_native_1.Animated.timing(animateMaxPosition, {
                toValue: percentMax,
                duration: 150,
                useNativeDriver: false,
            }).start();
        }
    }, [animateMaxPosition, inInteraction, percentMax]);
    (0, react_1.useEffect)(() => {
        if (inInteraction) {
            animateMinPosition.setValue(percentMin);
        }
        else {
            react_native_1.Animated.timing(animateMinPosition, {
                toValue: percentMin,
                duration: 150,
                useNativeDriver: false,
            }).start();
        }
    }, [animateMinPosition, inInteraction, percentMin]);
    const style = (0, useThemeStyle_1.useThemeStyle)((curTheme) => ({
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
    return (0, jsx_runtime_1.jsx)(react_native_1.Animated.View, { style: style });
});
exports.SliderTrack.displayName = "SliderTrack";
