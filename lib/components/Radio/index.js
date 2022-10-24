"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Radio = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const react_native_1 = require("react-native");
const theme_1 = require("../../theme");
const color_1 = __importDefault(require("color"));
const useHover_1 = require("../../hooks/useHover");
exports.Radio = (0, react_1.memo)(({ disabled, color = "primary", value = false, onChange, style, ...props }) => {
    const theme = (0, theme_1.useTheme)();
    const disabledColor = theme.palette.disabled;
    const themeColor = disabled ? disabledColor : theme.palette[color] || color;
    const backgroundColor = (0, color_1.default)(themeColor).isDark() ? "#FFF" : "#000";
    const hover = (0, useHover_1.useHover)();
    const onClick = (0, react_1.useCallback)(() => onChange?.(!value), [value, onChange]);
    const opacity = value ? 1 : hover.isActive ? 0.5 : 0;
    const containerStyle = (0, react_1.useMemo)(() => [
        styles.container,
        { backgroundColor: themeColor },
        style,
    ], [style, themeColor]);
    const dotStyle = (0, react_1.useMemo)(() => [styles.dot, { opacity, backgroundColor }], [backgroundColor, opacity]);
    return ((0, jsx_runtime_1.jsxs)(react_native_1.Pressable, { ...hover.handlers, nativeID: "radio", ...props, onPress: onClick, disabled: disabled, style: containerStyle, children: [react_native_1.Platform.OS === "web" && ((0, jsx_runtime_1.jsx)("input", { hidden: true, type: "radio", disabled: disabled, onChange: onClick, value: `${value}` })), (0, jsx_runtime_1.jsx)(react_native_1.View, { style: dotStyle })] }));
});
exports.Radio.displayName = "Radio";
const styles = react_native_1.StyleSheet.create({
    dot: {
        borderRadius: 999,
        padding: 6,
    },
    container: {
        borderRadius: 999,
        justifyContent: "center",
        alignItems: "center",
        width: 25,
        height: 25,
    },
});
