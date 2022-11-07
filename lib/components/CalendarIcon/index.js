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
import { StyleSheet, View, } from "react-native";
import { useTheme } from "../../theme";
import ColorJS from "color";
import dayjs from "dayjs";
import { Typography } from "../Typography";
export const CalendarIcon = memo((_a) => {
    var { size = 50, variant = "rounded", date = new Date(), color = "primary", style } = _a, props = __rest(_a, ["size", "variant", "date", "color", "style"]);
    const theme = useTheme();
    const backgroundColor = theme.palette.background.default;
    const primaryFontColor = theme.palette.text;
    const themeColor = theme.palette[color] || color;
    const secondaryFontColor = ColorJS(themeColor).isDark() ? "#FFF" : "#000";
    const primaryFontSize = size / 3;
    const secondaryFontSize = size / 6;
    const circularPadding = variant === "circular" ? size / 10 : 1;
    const momentDate = dayjs(date);
    const calendarStyle = useMemo(() => {
        const borderRadius = theme.borderRadius / 1.5;
        if (variant === "rounded")
            return { borderRadius };
        if (variant === "square")
            return { borderRadius: 0 };
        return { borderRadius: 900 };
    }, [theme.borderRadius, variant]);
    const containerStyle = useMemo(() => [
        calendarStyle,
        {
            height: size,
            width: size,
            overflow: "hidden",
            backgroundColor: backgroundColor,
        },
        style,
    ], [backgroundColor, calendarStyle, size, style]);
    const outlineText = useMemo(() => ({
        paddingTop: circularPadding,
        textAlign: "center",
        padding: 1,
        fontSize: secondaryFontSize,
        backgroundColor: themeColor,
        color: secondaryFontColor,
    }), [circularPadding, secondaryFontColor, secondaryFontSize, themeColor]);
    const centerText = useMemo(() => ({
        textAlign: "center",
        color: primaryFontColor,
        fontWeight: "normal",
        fontSize: primaryFontSize,
    }), [primaryFontColor, primaryFontSize]);
    return (_jsxs(View, Object.assign({ nativeID: "calendarIcon" }, props, { style: containerStyle }, { children: [_jsx(Typography, Object.assign({ style: outlineText }, { children: momentDate.format("dddd") })), _jsx(View, Object.assign({ style: styles.centerContent }, { children: _jsx(Typography, Object.assign({ style: centerText }, { children: momentDate.format("DD") })) })), _jsx(Typography, Object.assign({ style: outlineText }, { children: momentDate.format("MMMM") }))] })));
});
CalendarIcon.displayName = "CalendarIcon";
const styles = StyleSheet.create({
    centerContent: {
        flex: 1,
        justifyContent: "center",
    },
});
