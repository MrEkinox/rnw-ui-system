"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LinearProgress = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const react_native_1 = require("react-native");
const theme_1 = require("../../theme");
const color_1 = __importDefault(require("color"));
const react_2 = require("react");
exports.LinearProgress = (0, react_1.memo)(({ color = "primary", valueBuffer, value, variant, style, ...props }) => {
    const theme = (0, theme_1.useTheme)();
    const valueAnim = (0, react_1.useMemo)(() => new react_native_1.Animated.Value(0), []);
    const bufferAnim = (0, react_1.useMemo)(() => new react_native_1.Animated.Value(0), []);
    const themeColor = theme.palette[color] || color;
    const backgroundColor = (0, color_1.default)(themeColor).fade(0.8).toString();
    const bufferColor = (0, color_1.default)(themeColor).fade(0.6).toString();
    (0, react_2.useEffect)(() => {
        if (typeof value === "number")
            react_native_1.Animated.timing(valueAnim, {
                toValue: value,
                duration: 200,
                useNativeDriver: false,
            }).start();
    }, [value, valueAnim]);
    (0, react_2.useEffect)(() => {
        if (typeof valueBuffer === "number")
            react_native_1.Animated.timing(bufferAnim, {
                toValue: valueBuffer,
                duration: 200,
                useNativeDriver: false,
            }).start();
    }, [bufferAnim, valueBuffer]);
    const bufferStyle = (0, react_1.useMemo)(() => ({
        height: "100%",
        position: "absolute",
        width: bufferAnim.interpolate({
            inputRange: [0, 100],
            outputRange: ["0%", "100%"],
        }),
        backgroundColor: bufferColor,
    }), [bufferAnim, bufferColor]);
    const progressStyle = (0, react_1.useMemo)(() => ({
        height: "100%",
        position: "absolute",
        width: valueAnim.interpolate({
            inputRange: [0, 100],
            outputRange: ["0%", "100%"],
        }),
        backgroundColor: themeColor,
    }), [themeColor, valueAnim]);
    const containerStyle = (0, react_1.useMemo)(() => [{ height: 8, backgroundColor }, style], [backgroundColor, style]);
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { ...props, style: containerStyle, children: [variant === "buffer" && (0, jsx_runtime_1.jsx)(react_native_1.Animated.View, { style: bufferStyle }), (0, jsx_runtime_1.jsx)(react_native_1.Animated.View, { style: progressStyle })] }));
});
exports.LinearProgress.displayName = "LinearProgress";
