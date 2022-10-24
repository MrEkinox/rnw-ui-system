import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { memo, useMemo } from "react";
import { Animated, View } from "react-native";
import { useTheme } from "../../theme";
import ColorJS from "color";
import { useEffect } from "react";
export const LinearProgress = memo(({ color = "primary", valueBuffer, value, variant, style, ...props }) => {
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
    return (_jsxs(View, { ...props, style: containerStyle, children: [variant === "buffer" && _jsx(Animated.View, { style: bufferStyle }), _jsx(Animated.View, { style: progressStyle })] }));
});
LinearProgress.displayName = "LinearProgress";
