"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CalendarIcon = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const react_native_1 = require("react-native");
const theme_1 = require("../../theme");
const color_1 = __importDefault(require("color"));
const moment_1 = __importDefault(require("moment"));
const Typography_1 = require("../Typography");
exports.CalendarIcon = (0, react_1.memo)(({ size = 50, variant = "rounded", date = new Date(), color = "primary", style, ...props }) => {
    const theme = (0, theme_1.useTheme)();
    const backgroundColor = theme.palette.background.default;
    const primaryFontColor = theme.palette.text;
    const themeColor = theme.palette[color] || color;
    const secondaryFontColor = (0, color_1.default)(themeColor).isDark() ? "#FFF" : "#000";
    const primaryFontSize = size / 3;
    const secondaryFontSize = size / 6;
    const circularPadding = variant === "circular" ? size / 10 : 1;
    const momentDate = (0, moment_1.default)(date);
    const calendarStyle = (0, react_1.useMemo)(() => {
        const borderRadius = theme.borderRadius / 1.5;
        if (variant === "rounded")
            return { borderRadius };
        if (variant === "square")
            return { borderRadius: 0 };
        return { borderRadius: 900 };
    }, [theme.borderRadius, variant]);
    const containerStyle = (0, react_1.useMemo)(() => [
        calendarStyle,
        {
            height: size,
            width: size,
            overflow: "hidden",
            backgroundColor: backgroundColor,
        },
        style,
    ], [backgroundColor, calendarStyle, size, style]);
    const outlineText = (0, react_1.useMemo)(() => ({
        paddingTop: circularPadding,
        textAlign: "center",
        padding: 1,
        fontSize: secondaryFontSize,
        backgroundColor: themeColor,
        color: secondaryFontColor,
    }), [circularPadding, secondaryFontColor, secondaryFontSize, themeColor]);
    const centerText = (0, react_1.useMemo)(() => ({
        textAlign: "center",
        color: primaryFontColor,
        fontWeight: "normal",
        fontSize: primaryFontSize,
    }), [primaryFontColor, primaryFontSize]);
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { nativeID: "calendarIcon", ...props, style: containerStyle, children: [(0, jsx_runtime_1.jsx)(Typography_1.Typography, { style: outlineText, children: momentDate.format("dddd") }), (0, jsx_runtime_1.jsx)(react_native_1.View, { style: styles.centerContent, children: (0, jsx_runtime_1.jsx)(Typography_1.Typography, { style: centerText, children: momentDate.format("DD") }) }), (0, jsx_runtime_1.jsx)(Typography_1.Typography, { style: outlineText, children: momentDate.format("MMMM") })] }));
});
exports.CalendarIcon.displayName = "CalendarIcon";
const styles = react_native_1.StyleSheet.create({
    centerContent: {
        flex: 1,
        justifyContent: "center",
    },
});
