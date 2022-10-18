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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LinearProgress = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var react_native_1 = require("react-native");
var theme_1 = require("../../theme");
var color_1 = __importDefault(require("color"));
var react_2 = require("react");
exports.LinearProgress = (0, react_1.memo)(function (_a) {
    var _b = _a.color, color = _b === void 0 ? "primary" : _b, valueBuffer = _a.valueBuffer, value = _a.value, variant = _a.variant, style = _a.style, props = __rest(_a, ["color", "valueBuffer", "value", "variant", "style"]);
    var theme = (0, theme_1.useTheme)();
    var valueAnim = (0, react_1.useMemo)(function () { return new react_native_1.Animated.Value(0); }, []);
    var bufferAnim = (0, react_1.useMemo)(function () { return new react_native_1.Animated.Value(0); }, []);
    var themeColor = theme.palette[color] || color;
    var backgroundColor = (0, color_1.default)(themeColor).fade(0.8).toString();
    var bufferColor = (0, color_1.default)(themeColor).fade(0.6).toString();
    (0, react_2.useEffect)(function () {
        if (typeof value === "number")
            react_native_1.Animated.timing(valueAnim, {
                toValue: value,
                duration: 200,
                useNativeDriver: false,
            }).start();
    }, [value, valueAnim]);
    (0, react_2.useEffect)(function () {
        if (typeof valueBuffer === "number")
            react_native_1.Animated.timing(bufferAnim, {
                toValue: valueBuffer,
                duration: 200,
                useNativeDriver: false,
            }).start();
    }, [bufferAnim, valueBuffer]);
    var bufferStyle = (0, react_1.useMemo)(function () { return ({
        height: "100%",
        position: "absolute",
        width: bufferAnim.interpolate({
            inputRange: [0, 100],
            outputRange: ["0%", "100%"],
        }),
        backgroundColor: bufferColor,
    }); }, [bufferAnim, bufferColor]);
    var progressStyle = (0, react_1.useMemo)(function () { return ({
        height: "100%",
        position: "absolute",
        width: valueAnim.interpolate({
            inputRange: [0, 100],
            outputRange: ["0%", "100%"],
        }),
        backgroundColor: themeColor,
    }); }, [themeColor, valueAnim]);
    var containerStyle = (0, react_1.useMemo)(function () { return [{ height: 8, backgroundColor: backgroundColor }, style]; }, [backgroundColor, style]);
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, __assign({}, props, { style: containerStyle }, { children: [variant === "buffer" && (0, jsx_runtime_1.jsx)(react_native_1.Animated.View, { style: bufferStyle }), (0, jsx_runtime_1.jsx)(react_native_1.Animated.View, { style: progressStyle })] })));
});
exports.LinearProgress.displayName = "LinearProgress";
