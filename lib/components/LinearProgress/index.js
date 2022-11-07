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
import { memo, useMemo } from "react";
import { Animated, View } from "react-native";
import { useTheme } from "../../theme";
import ColorJS from "color";
import { useEffect } from "react";
export const LinearProgress = memo((_a) => {
    var { color = "primary", valueBuffer, value, variant, style } = _a, props = __rest(_a, ["color", "valueBuffer", "value", "variant", "style"]);
    const theme = useTheme();
    const valueAnim = useMemo(() => new Animated.Value(0), []);
    const bufferAnim = useMemo(() => new Animated.Value(0), []);
    const themeColor = theme.palette[color] || color;
    const backgroundColor = ColorJS(themeColor).fade(0.8).toString();
    const bufferColor = ColorJS(themeColor).fade(0.6).toString();
    useEffect(() => {
        if (typeof value === "number")
            Animated.timing(valueAnim, {
                toValue: value,
                duration: 200,
                useNativeDriver: false,
            }).start();
    }, [value, valueAnim]);
    useEffect(() => {
        if (typeof valueBuffer === "number")
            Animated.timing(bufferAnim, {
                toValue: valueBuffer,
                duration: 200,
                useNativeDriver: false,
            }).start();
    }, [bufferAnim, valueBuffer]);
    const bufferStyle = useMemo(() => ({
        height: "100%",
        position: "absolute",
        width: bufferAnim.interpolate({
            inputRange: [0, 100],
            outputRange: ["0%", "100%"],
        }),
        backgroundColor: bufferColor,
    }), [bufferAnim, bufferColor]);
    const progressStyle = useMemo(() => ({
        height: "100%",
        position: "absolute",
        width: valueAnim.interpolate({
            inputRange: [0, 100],
            outputRange: ["0%", "100%"],
        }),
        backgroundColor: themeColor,
    }), [themeColor, valueAnim]);
    const containerStyle = useMemo(() => [{ height: 8, backgroundColor }, style], [backgroundColor, style]);
    return (_jsxs(View, Object.assign({}, props, { style: containerStyle }, { children: [variant === "buffer" && _jsx(Animated.View, { style: bufferStyle }), _jsx(Animated.View, { style: progressStyle })] })));
});
LinearProgress.displayName = "LinearProgress";
