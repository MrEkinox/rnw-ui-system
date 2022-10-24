import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { memo, useCallback, useMemo } from "react";
import { Platform, Pressable, StyleSheet, View, } from "react-native";
import { useTheme } from "../../theme";
import { Icon } from "../Icon";
import ColorJS from "color";
import { useHover } from "../../hooks/useHover";
import { Typography } from "../Typography";
export const Checkbox = memo(({ disabled, color = "primary", value = false, onChange, label, style, ...props }) => {
    const theme = useTheme();
    const borderRadius = theme.borderRadius / 2;
    const disabledColor = theme.palette.disabled;
    const themeColor = disabled ? disabledColor : theme.palette[color] || color;
    const iconColor = ColorJS(themeColor).isDark() ? "#FFF" : "#000";
    const hover = useHover();
    const onClick = useCallback(() => onChange?.(!value), [value, onChange]);
    const opacity = value ? 1 : hover.isActive ? 0.5 : 0;
    const containerStyle = useMemo(() => [
        styles.container,
        { borderRadius, backgroundColor: themeColor },
        style,
    ], [borderRadius, style, themeColor]);
    const iconStyle = useMemo(() => ({ opacity }), [opacity]);
    return (_jsxs(View, { style: styles.flex, children: [_jsxs(Pressable, { ...hover.handlers, nativeID: "checkbox", ...props, onPress: onClick, disabled: disabled, style: containerStyle, children: [Platform.OS === "web" && (_jsx("input", { hidden: true, type: "checkbox", disabled: disabled, onChange: onClick, value: `${value}` })), _jsx(Icon, { style: iconStyle, type: "Ionicons", name: "checkmark", color: iconColor })] }), label && (_jsx(Typography, { variant: "body1", style: styles.label, children: label }))] }));
});
Checkbox.displayName = "Checkbox";
const styles = StyleSheet.create({
    flex: { flexDirection: "row", alignItems: "center", flexWrap: "wrap" },
    label: { marginLeft: 10 },
    container: {
        justifyContent: "center",
        alignItems: "center",
        width: 25,
        height: 25,
    },
});
