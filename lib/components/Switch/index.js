import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { memo, useCallback, useMemo } from "react";
import { Animated, Platform, Pressable, StyleSheet, View, } from "react-native";
import { useTheme } from "../../theme";
import { useHover } from "../../hooks/useHover";
import { Typography } from "../Typography";
import { useEffect } from "react";
export const Switch = memo(({ value = false, disabled, onChange, style, label, ...props }) => {
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
    const onClick = useCallback(() => onChange?.(!value), [value, onChange]);
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
    return (_jsxs(View, { style: styles.flex, children: [_jsxs(Pressable, { ...hover.handlers, nativeID: "switch", ...props, onPress: onClick, disabled: disabled, style: containerStyle, children: [Platform.OS === "web" && (_jsx("input", { hidden: true, type: "checkbox", disabled: disabled, onChange: onClick, value: `${value}` })), _jsx(Animated.View, { style: knowStyle })] }), label && (_jsx(Typography, { variant: "body1", style: styles.label, children: label }))] }));
});
Switch.displayName = "Switch";
const styles = StyleSheet.create({
    flex: { flexDirection: "row", alignItems: "center", flexWrap: "wrap" },
    label: { marginLeft: 10 },
});
