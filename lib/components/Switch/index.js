"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Switch = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const react_native_1 = require("react-native");
const theme_1 = require("../../theme");
const useHover_1 = require("../../hooks/useHover");
const Typography_1 = require("../Typography");
const react_2 = require("react");
exports.Switch = (0, react_1.memo)(({ value = false, disabled, onChange, style, label, ...props }) => {
    const theme = (0, theme_1.useTheme)();
    const animation = (0, react_1.useMemo)(() => new react_native_1.Animated.Value(value ? 1 : 0), [value]);
    const hover = (0, useHover_1.useHover)();
    const borderRadius = theme.borderRadius;
    const successColor = theme.palette.success;
    const errorColor = theme.palette.error;
    const disabledColor = theme.palette.disabled;
    const backgroundColor = theme.palette.background.default;
    const currentColor = disabled
        ? disabledColor
        : animation.interpolate({
            inputRange: [0, 1],
            outputRange: [errorColor, successColor],
        });
    const onClick = (0, react_1.useCallback)(() => onChange?.(!value), [value, onChange]);
    (0, react_2.useEffect)(() => {
        react_native_1.Animated.timing(animation, {
            toValue: value ? 1 : 0,
            duration: 150,
            useNativeDriver: false,
        }).start();
    }, [animation, value]);
    const containerWidth = 50;
    const knockWidth = 15;
    const padding = 4;
    const marginLeft = animation.interpolate({
        inputRange: [0, 1],
        outputRange: [0, containerWidth - (knockWidth + padding * 2)],
    });
    const knowStyle = (0, react_1.useMemo)(() => ({
        opacity: hover.isActive ? 0.5 : 1,
        borderRadius,
        height: knockWidth,
        width: knockWidth,
        marginLeft,
        backgroundColor: currentColor,
    }), [borderRadius, currentColor, hover.isActive, marginLeft]);
    const containerStyle = (0, react_1.useMemo)(() => [
        {
            width: containerWidth,
            padding,
            borderRadius,
            backgroundColor,
        },
        style,
    ], [backgroundColor, borderRadius, style]);
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: styles.flex, children: [(0, jsx_runtime_1.jsxs)(react_native_1.Pressable, { ...hover.handlers, nativeID: "switch", ...props, onPress: onClick, disabled: disabled, style: containerStyle, children: [react_native_1.Platform.OS === "web" && ((0, jsx_runtime_1.jsx)("input", { hidden: true, type: "checkbox", disabled: disabled, onChange: onClick, value: `${value}` })), (0, jsx_runtime_1.jsx)(react_native_1.Animated.View, { style: knowStyle })] }), label && ((0, jsx_runtime_1.jsx)(Typography_1.Typography, { variant: "body1", style: styles.label, children: label }))] }));
});
exports.Switch.displayName = "Switch";
const styles = react_native_1.StyleSheet.create({
    flex: { flexDirection: "row", alignItems: "center", flexWrap: "wrap" },
    label: { marginLeft: 10 },
});
