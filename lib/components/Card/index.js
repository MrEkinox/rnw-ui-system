"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Card = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const react_native_1 = require("react-native");
const theme_1 = require("../../theme");
exports.Card = (0, react_1.memo)(({ children, square, variant, elevation = 5, color = "primary", style, ...props }) => {
    const theme = (0, theme_1.useTheme)();
    const borderRadius = square ? 0 : theme.borderRadius;
    const backgroundColor = theme.palette.background.card;
    const themeColor = theme.palette[color] || color;
    const outlinedStyle = (0, react_1.useMemo)(() => {
        return {
            borderColor: themeColor,
            borderWidth: 2,
            borderStyle: "solid",
        };
    }, [themeColor]);
    const elevationStyle = (0, react_1.useMemo)(() => {
        return {
            shadowColor: themeColor,
            shadowOffset: { width: 0, height: 0 },
            shadowOpacity: 0.25,
            shadowRadius: elevation,
        };
    }, [elevation, themeColor]);
    const cardStyle = (0, react_1.useMemo)(() => {
        if (variant === "elevation")
            return elevationStyle;
        if (variant === "outlined")
            return outlinedStyle;
    }, [elevationStyle, variant, outlinedStyle]);
    const containerStyle = (0, react_1.useMemo)(() => [{ borderRadius, backgroundColor }, cardStyle, style], [backgroundColor, borderRadius, cardStyle, style]);
    return ((0, jsx_runtime_1.jsx)(react_native_1.View, { nativeID: "card", ...props, style: containerStyle, children: children }));
});
exports.Card.displayName = "Card";
