"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Typography = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
var useThemeStyle_1 = require("../../hooks/useThemeStyle");
var react_1 = require("react");
var react_native_1 = require("react-native");
var theme_1 = require("../../theme");
exports.Typography = (0, react_1.memo)(function (_a) {
    var children = _a.children, align = _a.align, gutterBottom = _a.gutterBottom, noWrap = _a.noWrap, variant = _a.variant, loading = _a.loading, secondary = _a.secondary, defaultWidth = _a.defaultWidth, vertical = _a.vertical, direction = _a.direction, _b = _a.color, color = _b === void 0 ? "text" : _b, props = __rest(_a, ["children", "align", "gutterBottom", "noWrap", "variant", "loading", "secondary", "defaultWidth", "vertical", "direction", "color"]);
    var theme = (0, theme_1.useTheme)();
    var variantStyle = variant && theme.typography[variant];
    var fontSize = (variantStyle === null || variantStyle === void 0 ? void 0 : variantStyle["fontSize"]) || 1;
    var style = (0, useThemeStyle_1.useThemeStyle)(function (curTheme) {
        var fontFamily = curTheme.typography.fontFamily;
        var fontColor = curTheme.palette[color] || color;
        var disabledColor = curTheme.palette.disabled;
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
                fontFamily: fontFamily,
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
    var verticalStyle = (0, react_1.useMemo)(function () { return ({
        alignItems: "center",
        width: fontSize,
        height: "100%",
    }); }, [fontSize]);
    if (vertical) {
        return ((0, jsx_runtime_1.jsx)(react_native_1.View, __assign({ style: verticalStyle }, { children: (0, jsx_runtime_1.jsx)(react_native_1.Text, __assign({ ellipsizeMode: noWrap ? "tail" : undefined }, props, { style: style }, { children: children || " " })) })));
    }
    return ((0, jsx_runtime_1.jsx)(react_native_1.Text, __assign({ ellipsizeMode: noWrap ? "tail" : undefined }, props, { style: style }, { children: children || " " })));
});
exports.Typography.displayName = "Typography";
