"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SliderStepDots = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
var useThemeStyle_1 = require("../../hooks/useThemeStyle");
var react_1 = require("react");
var react_native_1 = require("react-native");
exports.SliderStepDots = (0, react_1.memo)(function (_a) {
    var step = _a.step, maxValue = _a.maxValue;
    var dotStyle = (0, useThemeStyle_1.useThemeStyle)(function (theme) { return [
        styles.dot,
        { backgroundColor: theme.palette.background.card },
    ]; }, []);
    if (!step)
        return null;
    return ((0, jsx_runtime_1.jsx)(react_native_1.View, __assign({ style: styles.container }, { children: Array.from({ length: Math.round(maxValue / step) + 1 }).map(function (_, stepIndex) { return ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: dotStyle }, stepIndex)); }) })));
});
exports.SliderStepDots.displayName = "SliderStepDots";
var styles = react_native_1.StyleSheet.create({
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
