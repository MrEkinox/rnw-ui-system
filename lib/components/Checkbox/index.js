"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Checkbox = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const react_native_1 = require("react-native");
const theme_1 = require("../../theme");
const Icon_1 = require("../Icon");
const color_1 = __importDefault(require("color"));
const useHover_1 = require("../../hooks/useHover");
const Typography_1 = require("../Typography");
exports.Checkbox = (0, react_1.memo)(({ disabled, color = "primary", value = false, onChange, label, style, ...props }) => {
    const theme = (0, theme_1.useTheme)();
    const borderRadius = theme.borderRadius / 2;
    const disabledColor = theme.palette.disabled;
    const themeColor = disabled ? disabledColor : theme.palette[color] || color;
    const iconColor = (0, color_1.default)(themeColor).isDark() ? "#FFF" : "#000";
    const hover = (0, useHover_1.useHover)();
    const onClick = (0, react_1.useCallback)(() => onChange?.(!value), [value, onChange]);
    const opacity = value ? 1 : hover.isActive ? 0.5 : 0;
    const containerStyle = (0, react_1.useMemo)(() => [
        styles.container,
        { borderRadius, backgroundColor: themeColor },
        style,
    ], [borderRadius, style, themeColor]);
    const iconStyle = (0, react_1.useMemo)(() => ({ opacity }), [opacity]);
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: styles.flex, children: [(0, jsx_runtime_1.jsxs)(react_native_1.Pressable, { ...hover.handlers, nativeID: "checkbox", ...props, onPress: onClick, disabled: disabled, style: containerStyle, children: [react_native_1.Platform.OS === "web" && ((0, jsx_runtime_1.jsx)("input", { hidden: true, type: "checkbox", disabled: disabled, onChange: onClick, value: `${value}` })), (0, jsx_runtime_1.jsx)(Icon_1.Icon, { style: iconStyle, type: "Ionicons", name: "checkmark", color: iconColor })] }), label && ((0, jsx_runtime_1.jsx)(Typography_1.Typography, { variant: "body1", style: styles.label, children: label }))] }));
});
exports.Checkbox.displayName = "Checkbox";
const styles = react_native_1.StyleSheet.create({
    flex: { flexDirection: "row", alignItems: "center", flexWrap: "wrap" },
    label: { marginLeft: 10 },
    container: {
        justifyContent: "center",
        alignItems: "center",
        width: 25,
        height: 25,
    },
});
