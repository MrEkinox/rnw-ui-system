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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Switch = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var react_native_1 = require("react-native");
var theme_1 = require("../../theme");
var useHover_1 = require("../../hooks/useHover");
var Typography_1 = require("../Typography");
var react_2 = require("react");
exports.Switch = (0, react_1.memo)(function (_a) {
    var _b = _a.value, value = _b === void 0 ? false : _b, disabled = _a.disabled, onChange = _a.onChange, style = _a.style, label = _a.label, props = __rest(_a, ["value", "disabled", "onChange", "style", "label"]);
    var theme = (0, theme_1.useTheme)();
    var animation = (0, react_1.useMemo)(function () { return new react_native_1.Animated.Value(value ? 1 : 0); }, [value]);
    var hover = (0, useHover_1.useHover)();
    var borderRadius = theme.borderRadius;
    var successColor = theme.palette.success;
    var errorColor = theme.palette.error;
    var disabledColor = theme.palette.disabled;
    var backgroundColor = theme.palette.background.default;
    var currentColor = disabled
        ? disabledColor
        : animation.interpolate({
            inputRange: [0, 1],
            outputRange: [errorColor, successColor],
        });
    var onClick = (0, react_1.useCallback)(function () { return onChange === null || onChange === void 0 ? void 0 : onChange(!value); }, [value, onChange]);
    (0, react_2.useEffect)(function () {
        react_native_1.Animated.timing(animation, {
            toValue: value ? 1 : 0,
            duration: 150,
            useNativeDriver: false,
        }).start();
    }, [animation, value]);
    var containerWidth = 50;
    var knockWidth = 15;
    var padding = 4;
    var marginLeft = animation.interpolate({
        inputRange: [0, 1],
        outputRange: [0, containerWidth - (knockWidth + padding * 2)],
    });
    var knowStyle = (0, react_1.useMemo)(function () { return ({
        opacity: hover.isActive ? 0.5 : 1,
        borderRadius: borderRadius,
        height: knockWidth,
        width: knockWidth,
        marginLeft: marginLeft,
        backgroundColor: currentColor,
    }); }, [borderRadius, currentColor, hover.isActive, marginLeft]);
    var containerStyle = (0, react_1.useMemo)(function () { return [
        {
            width: containerWidth,
            padding: padding,
            borderRadius: borderRadius,
            backgroundColor: backgroundColor,
        },
        style,
    ]; }, [backgroundColor, borderRadius, style]);
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, __assign({ style: styles.flex }, { children: [(0, jsx_runtime_1.jsxs)(react_native_1.Pressable, __assign({}, hover.handlers, { nativeID: "switch" }, props, { onPress: onClick, disabled: disabled, style: containerStyle }, { children: [react_native_1.Platform.OS === "web" && ((0, jsx_runtime_1.jsx)("input", { hidden: true, type: "checkbox", disabled: disabled, onChange: onClick, value: "".concat(value) })), (0, jsx_runtime_1.jsx)(react_native_1.Animated.View, { style: knowStyle })] })), label && ((0, jsx_runtime_1.jsx)(Typography_1.Typography, __assign({ variant: "body1", style: styles.label }, { children: label })))] })));
});
exports.Switch.displayName = "Switch";
var styles = react_native_1.StyleSheet.create({
    flex: { flexDirection: "row", alignItems: "center", flexWrap: "wrap" },
    label: { marginLeft: 10 },
});
