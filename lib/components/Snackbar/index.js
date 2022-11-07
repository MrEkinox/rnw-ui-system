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
import { Card } from "../Card";
import { useTheme } from "../../theme";
import { Typography } from "../Typography";
import ColorJS from "color";
import { Icon } from "../Icon";
import { StyleSheet, View } from "react-native";
import { renderIcon } from "../../utils";
export const Snackbar = memo((_a) => {
    var { color = "#000", icon = true, message, style, children } = _a, props = __rest(_a, ["color", "icon", "message", "style", "children"]);
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
    return (_jsxs(Card, Object.assign({ style: containerStyle }, props, { children: [iconContent && _jsx(View, Object.assign({ style: styles.icon }, { children: iconContent })), typeof message === "string" ? (_jsx(Typography, Object.assign({ color: fontColor, variant: "subtitle2" }, { children: message }))) : (message), children] })));
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
