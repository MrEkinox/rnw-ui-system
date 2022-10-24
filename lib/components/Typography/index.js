"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Typography = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const useThemeStyle_1 = require("../../hooks/useThemeStyle");
const react_1 = require("react");
const react_native_1 = require("react-native");
const theme_1 = require("../../theme");
exports.Typography = (0, react_1.memo)(({ children, align, gutterBottom, noWrap, variant, loading, secondary, defaultWidth, vertical, direction, color = "text", ...props }) => {
    const theme = (0, theme_1.useTheme)();
    const variantStyle = variant && theme.typography[variant];
    const fontSize = variantStyle?.["fontSize"] || 1;
    const style = (0, useThemeStyle_1.useThemeStyle)((curTheme) => {
        const fontFamily = curTheme.typography.fontFamily;
        const fontColor = curTheme.palette[color] || color;
        const disabledColor = curTheme.palette.disabled;
        return [
            loading && {
                width: defaultWidth,
                backgroundColor: disabledColor,
                borderRadius: 5,
            },
            vertical && {
                transform: [{ rotate: direction === "ltr" ? "-90deg" : "90deg" }],
            },
            {
                textDecorationLine: "none",
                color: fontColor,
                fontFamily,
                textAlign: align,
                opacity: secondary ? 0.8 : 1,
                marginBottom: gutterBottom ? fontSize / 4 : undefined,
            },
            noWrap && {
                textOverflow: "ellipsis",
                overflow: "hidden",
                whiteSpace: "nowrap",
            },
            variantStyle,
            props.style,
        ];
    }, [
        color,
        loading,
        defaultWidth,
        vertical,
        direction,
        align,
        secondary,
        gutterBottom,
        fontSize,
        noWrap,
        variantStyle,
        props.style,
    ]);
    const verticalStyle = (0, react_1.useMemo)(() => ({
        alignItems: "center",
        width: fontSize,
        height: "100%",
    }), [fontSize]);
    if (vertical) {
        return ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: verticalStyle, children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { ellipsizeMode: noWrap ? "tail" : undefined, ...props, style: style, children: children || " " }) }));
    }
    return ((0, jsx_runtime_1.jsx)(react_native_1.Text, { ellipsizeMode: noWrap ? "tail" : undefined, ...props, style: style, children: children || " " }));
});
exports.Typography.displayName = "Typography";
