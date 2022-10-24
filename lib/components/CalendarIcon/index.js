import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { memo, useMemo } from "react";
import { StyleSheet, View, } from "react-native";
import { useTheme } from "../../theme";
import ColorJS from "color";
import moment from "moment";
import { Typography } from "../Typography";
export const CalendarIcon = memo(({ size = 50, variant = "rounded", date = new Date(), color = "primary", style, ...props }) => {
    const theme = useTheme();
    const backgroundColor = theme.palette.background.default;
    const primaryFontColor = theme.palette.text;
    const themeColor = theme.palette[color] || color;
    const secondaryFontColor = ColorJS(themeColor).isDark() ? "#FFF" : "#000";
    const primaryFontSize = size / 3;
    const secondaryFontSize = size / 6;
    const circularPadding = variant === "circular" ? size / 10 : 1;
    const momentDate = moment(date);
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
    return (_jsxs(View, { nativeID: "calendarIcon", ...props, style: containerStyle, children: [_jsx(Typography, { style: outlineText, children: momentDate.format("dddd") }), _jsx(View, { style: styles.centerContent, children: _jsx(Typography, { style: centerText, children: momentDate.format("DD") }) }), _jsx(Typography, { style: outlineText, children: momentDate.format("MMMM") })] }));
});
CalendarIcon.displayName = "CalendarIcon";
const styles = StyleSheet.create({
    centerContent: {
        flex: 1,
        justifyContent: "center",
    },
});
