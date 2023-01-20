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
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { memo, useCallback, useMemo } from "react";
import { Animated, Platform, Pressable, StyleSheet, View, } from "react-native";
import { useTheme } from "../../theme";
import { useHover } from "../../hooks/useHover";
import { Typography } from "../Typography";
import { useEffect } from "react";
export const Switch = memo((_a) => {
    var { value = false, disabled, onChange, style, label } = _a, props = __rest(_a, ["value", "disabled", "onChange", "style", "label"]);
    const theme = useTheme();
    const animation = useMemo(() => new Animated.Value(value ? 1 : 0), [value]);
    const hover = useHover();
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
    const onClick = useCallback(() => onChange === null || onChange === void 0 ? void 0 : onChange(!value), [value, onChange]);
    useEffect(() => {
        Animated.timing(animation, {
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
    const knowStyle = useMemo(() => ({
        opacity: hover.isActive ? 0.5 : 1,
        borderRadius,
        height: knockWidth,
        width: knockWidth,
        marginLeft,
        backgroundColor: currentColor,
    }), [borderRadius, currentColor, hover.isActive, marginLeft]);
    const containerStyle = useMemo(() => [
        {
            width: containerWidth,
            padding,
            borderRadius,
            backgroundColor,
        },
        style,
    ], [backgroundColor, borderRadius, style]);
    return (_jsxs(View, Object.assign({ style: styles.flex }, { children: [_jsxs(Pressable, Object.assign({}, hover.handlers, { nativeID: "switch" }, props, { onPress: onClick, disabled: disabled, style: containerStyle }, { children: [Platform.OS === "web" && (_jsx("input", { hidden: true, type: "checkbox", disabled: disabled, onChange: onClick, value: `${value}` })), _jsx(Animated.View, { style: knowStyle })] })), label && (_jsx(Typography, Object.assign({ variant: "subtitle2", style: styles.label }, { children: label })))] })));
});
Switch.displayName = "Switch";
const styles = StyleSheet.create({
    flex: { flexDirection: "row", alignItems: "center", flexWrap: "nowrap" },
    label: { marginLeft: 10 },
});
