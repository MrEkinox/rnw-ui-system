"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SliderStepDots = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const useThemeStyle_1 = require("../../hooks/useThemeStyle");
const react_1 = require("react");
const react_native_1 = require("react-native");
exports.SliderStepDots = (0, react_1.memo)(({ step, maxValue }) => {
    const dotStyle = (0, useThemeStyle_1.useThemeStyle)((theme) => [
        styles.dot,
        { backgroundColor: theme.palette.background.card },
    ], []);
    if (!step)
        return null;
    return ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: styles.container, children: Array.from({ length: Math.round(maxValue / step) + 1 }).map((_, stepIndex) => ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: dotStyle }, stepIndex))) }));
});
exports.SliderStepDots.displayName = "SliderStepDots";
const styles = react_native_1.StyleSheet.create({
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
