"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SliderTrack = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
var useThemeStyle_1 = require("../../hooks/useThemeStyle");
var react_1 = require("react");
var react_native_1 = require("react-native");
exports.SliderTrack = (0, react_1.memo)(function (_a) {
    var color = _a.color, values = _a.values, maxValue = _a.maxValue, minValue = _a.minValue, inInteraction = _a.inInteraction, step = _a.step;
    var currentMinValue = values.length === 1 ? minValue : Math.min.apply(Math, values);
    var currentMaxValue = Math.max.apply(Math, __spreadArray([0], values, false));
    var maxCurrentValue = inInteraction
        ? currentMaxValue
        : Math.round(currentMaxValue / step) * step;
    var minCurrentValue = inInteraction
        ? currentMinValue
        : Math.round(currentMinValue / step) * step;
    var percentMin = ((minCurrentValue - minValue) * 100) / (maxValue - minValue);
    var percentMax = ((maxCurrentValue - minValue) * 100) / (maxValue - minValue) - percentMin;
    var animateMaxPosition = (0, react_1.useMemo)(function () { return new react_native_1.Animated.Value(percentMax); }, [percentMax]);
    var animateMinPosition = (0, react_1.useMemo)(function () { return new react_native_1.Animated.Value(percentMin); }, [percentMin]);
    (0, react_1.useEffect)(function () {
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
    (0, react_1.useEffect)(function () {
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
    var style = (0, useThemeStyle_1.useThemeStyle)(function (curTheme) { return ({
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
    }); }, [animateMaxPosition, animateMinPosition, color]);
    return (0, jsx_runtime_1.jsx)(react_native_1.Animated.View, { style: style });
});
exports.SliderTrack.displayName = "SliderTrack";
