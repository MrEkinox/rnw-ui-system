import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { memo, useMemo } from "react";
import { Card } from "../Card";
import { useTheme } from "../../theme";
import { Typography } from "../Typography";
import ColorJS from "color";
import { Icon } from "../Icon";
import { StyleSheet, View } from "react-native";
import { renderIcon } from "../../utils";
export const Snackbar = memo(({ color = "#000", icon = true, message, style, children, ...props }) => {
    const theme = useTheme();
    const themeColor = theme.palette[color] || color;
    const fontColor = ColorJS(themeColor).isDark() ? "#FFF" : "#000";
    const iconContent = useMemo(() => {
        if (icon === false)
            return;
        switch (color) {
            case "success":
                return (_jsx(Icon, { type: "Ionicons", color: fontColor, name: "checkmark-circle" }));
            case "error":
                return _jsx(Icon, { type: "Ionicons", color: fontColor, name: "alert-circle" });
            case "warning":
                return _jsx(Icon, { type: "Ionicons", color: fontColor, name: "warning" });
            case "info":
                return (_jsx(Icon, { type: "Ionicons", color: fontColor, name: "information-circle" }));
        }
        if (typeof icon !== "boolean")
            return renderIcon(icon, { color: fontColor });
    }, [color, fontColor, icon]);
    const containerStyle = useMemo(() => [
        styles.container,
        { backgroundColor: themeColor },
        style,
    ], [style, themeColor]);
    return (_jsxs(Card, { style: containerStyle, ...props, children: [iconContent && _jsx(View, { style: styles.icon, children: iconContent }), typeof message === "string" ? (_jsx(Typography, { color: fontColor, variant: "subtitle2", children: message })) : (message), children] }));
});
Snackbar.displayName = "Snackbar";
const styles = StyleSheet.create({
    icon: {
        marginRight: 10,
    },
    container: {
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 15,
        paddingVertical: 10,
        width: "fit-content",
    },
});
