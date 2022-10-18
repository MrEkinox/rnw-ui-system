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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Chip = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var react_native_1 = require("react-native");
var theme_1 = require("../../theme");
var color_1 = __importDefault(require("color"));
var Typography_1 = require("../Typography");
var useHover_1 = require("../../hooks/useHover");
exports.Chip = (0, react_1.memo)(function (_a) {
    var children = _a.children, size = _a.size, disabled = _a.disabled, variant = _a.variant, _b = _a.color, color = _b === void 0 ? "primary" : _b, props = __rest(_a, ["children", "size", "disabled", "variant", "color"]);
    var theme = (0, theme_1.useTheme)();
    var hover = (0, useHover_1.useHover)();
    var borderRadius = theme.borderRadius;
    var themeColor = theme.palette[color] || color;
    var borderWidth = variant === "outlined" ? 2 : 0;
    var containedColor = (0, color_1.default)((0, color_1.default)(themeColor).isDark() ? "#FFF" : "#000")
        .fade(disabled ? 0.5 : 0)
        .toString();
    var variantStyle = (0, react_1.useMemo)(function () {
        if (variant === "outlined") {
            return {
                color: themeColor,
                borderColor: themeColor,
                borderWidth: borderWidth,
                borderStyle: "solid",
                backgroundColor: hover.isActive
                    ? (0, color_1.default)(themeColor).fade(0.7).toString()
                    : undefined,
            };
        }
        if (variant === "hovered") {
            return {
                color: themeColor,
                backgroundColor: hover.isActive
                    ? (0, color_1.default)(themeColor).fade(0.7).toString()
                    : undefined,
            };
        }
        if (variant === "fade") {
            return {
                color: themeColor,
                opacity: hover.isActive ? 0.5 : 1,
                backgroundColor: (0, color_1.default)(themeColor).fade(0.7).toString(),
            };
        }
        if (variant === "text") {
            return {
                color: themeColor,
                opacity: hover.isActive ? 0.5 : 1,
            };
        }
        return {
            backgroundColor: hover.isActive
                ? (0, color_1.default)(themeColor).fade(0.2).toString()
                : themeColor,
            color: containedColor,
        };
    }, [borderWidth, containedColor, hover.isActive, themeColor, variant]);
    var content = (0, react_1.useMemo)(function () {
        if (typeof children === "string") {
            return ((0, jsx_runtime_1.jsx)(Typography_1.Typography, __assign({ color: variantStyle["color"] }, { children: children })));
        }
        return children;
    }, [children, variantStyle]);
    var sizeStyle = (0, react_1.useMemo)(function () {
        if (variant === "text")
            return {};
        if (size === "large") {
            return {
                borderRadius: borderRadius,
                paddingHorizontal: 20 - borderWidth,
                paddingVertical: 10 - borderWidth,
                fontSize: 25,
            };
        }
        if (size === "small") {
            return {
                borderRadius: borderRadius / 2,
                paddingHorizontal: 5 - borderWidth,
                paddingVertical: 3 - borderWidth,
                fontSize: 17,
            };
        }
        return {
            borderRadius: borderRadius / 1.5,
            paddingHorizontal: 10 - borderWidth,
            paddingVertical: 5 - borderWidth,
            fontSize: 20,
        };
    }, [borderWidth, borderRadius, variant, size]);
    var style = (0, react_1.useMemo)(function () { return [
        { width: "fit-content" },
        variantStyle,
        sizeStyle,
        props.style,
    ]; }, [variantStyle, sizeStyle, props.style]);
    return ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, __assign({}, hover.handlers, { disabled: disabled || !props.onPress, nativeID: "chip" }, props, { style: style }, { children: content })));
});
exports.Chip.displayName = "Chip";
