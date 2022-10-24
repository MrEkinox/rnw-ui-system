import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { memo, useCallback, useMemo } from "react";
import { Platform, Pressable, StyleSheet, View, } from "react-native";
import { useTheme } from "../../theme";
import ColorJS from "color";
import { useHover } from "../../hooks/useHover";
export const Radio = memo(({ disabled, color = "primary", value = false, onChange, style, ...props }) => {
    const theme = useTheme();
    const disabledColor = theme.palette.disabled;
    const themeColor = disabled ? disabledColor : theme.palette[color] || color;
    const backgroundColor = ColorJS(themeColor).isDark() ? "#FFF" : "#000";
    const hover = useHover();
    const onClick = useCallback(() => onChange?.(!value), [value, onChange]);
    const opacity = value ? 1 : hover.isActive ? 0.5 : 0;
    const containerStyle = useMemo(() => [
        styles.container,
        { backgroundColor: themeColor },
        style,
    ], [style, themeColor]);
    const dotStyle = useMemo(() => [styles.dot, { opacity, backgroundColor }], [backgroundColor, opacity]);
    return (_jsxs(Pressable, { ...hover.handlers, nativeID: "radio", ...props, onPress: onClick, disabled: disabled, style: containerStyle, children: [Platform.OS === "web" && (_jsx("input", { hidden: true, type: "radio", disabled: disabled, onChange: onClick, value: `${value}` })), _jsx(View, { style: dotStyle })] }));
});
Radio.displayName = "Radio";
const styles = StyleSheet.create({
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
