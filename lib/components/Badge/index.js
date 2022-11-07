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
import { jsx as _jsx } from "react/jsx-runtime";
import { memo, useMemo } from "react";
import { StyleSheet, View, } from "react-native";
import { useTheme } from "../../theme";
import ColorJS from "color";
import { Typography } from "../Typography";
export const Badge = memo((_a) => {
    var { children, size = 5, color = "primary" } = _a, props = __rest(_a, ["children", "size", "color"]);
    const theme = useTheme();
    const themeColor = theme.palette[color] || color;
    const content = useMemo(() => {
        if (typeof children === "string") {
            const fontColor = ColorJS(themeColor).isDark() ? "#FFF" : "#000";
            return _jsx(Typography, Object.assign({ color: fontColor }, { children: children }));
        }
        return children;
    }, [children, themeColor]);
    const style = useMemo(() => [
        styles.container,
        { backgroundColor: themeColor, padding: size },
        props.style,
    ], [size, props.style, themeColor]);
    return (_jsx(View, Object.assign({ nativeID: "badge" }, props, { style: style }, { children: content })));
});
Badge.displayName = "Badge";
const styles = StyleSheet.create({
    container: {
        borderRadius: 500,
        width: "fit-content",
    },
});
