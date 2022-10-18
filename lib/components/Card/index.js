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
exports.Card = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var react_native_1 = require("react-native");
var theme_1 = require("../../theme");
exports.Card = (0, react_1.memo)(function (_a) {
    var children = _a.children, square = _a.square, variant = _a.variant, _b = _a.elevation, elevation = _b === void 0 ? 5 : _b, _c = _a.color, color = _c === void 0 ? "primary" : _c, style = _a.style, props = __rest(_a, ["children", "square", "variant", "elevation", "color", "style"]);
    var theme = (0, theme_1.useTheme)();
    var borderRadius = square ? 0 : theme.borderRadius;
    var backgroundColor = theme.palette.background.card;
    var themeColor = theme.palette[color] || color;
    var outlinedStyle = (0, react_1.useMemo)(function () {
        return {
            borderColor: themeColor,
            borderWidth: 2,
            borderStyle: "solid",
        };
    }, [themeColor]);
    var elevationStyle = (0, react_1.useMemo)(function () {
        return {
            shadowColor: themeColor,
            shadowOffset: { width: 0, height: 0 },
            shadowOpacity: 0.25,
            shadowRadius: elevation,
        };
    }, [elevation, themeColor]);
    var cardStyle = (0, react_1.useMemo)(function () {
        if (variant === "elevation")
            return elevationStyle;
        if (variant === "outlined")
            return outlinedStyle;
    }, [elevationStyle, variant, outlinedStyle]);
    var containerStyle = (0, react_1.useMemo)(function () { return [
        { borderRadius: borderRadius, backgroundColor: backgroundColor, overflow: "hidden" },
        cardStyle,
        style,
    ]; }, [backgroundColor, borderRadius, cardStyle, style]);
    return ((0, jsx_runtime_1.jsx)(react_native_1.View, __assign({ nativeID: "card" }, props, { style: containerStyle }, { children: children })));
});
exports.Card.displayName = "Card";
