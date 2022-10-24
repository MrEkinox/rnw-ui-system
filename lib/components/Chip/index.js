"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Chip = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const react_native_1 = require("react-native");
const theme_1 = require("../../theme");
const color_1 = __importDefault(require("color"));
const Typography_1 = require("../Typography");
const useHover_1 = require("../../hooks/useHover");
exports.Chip = (0, react_1.memo)(({ children, size, disabled, variant, color = "primary", ...props }) => {
    const theme = (0, theme_1.useTheme)();
    const hover = (0, useHover_1.useHover)();
    const borderRadius = theme.borderRadius;
    const themeColor = theme.palette[color] || color;
    const borderWidth = variant === "outlined" ? 2 : 0;
    const containedColor = (0, color_1.default)((0, color_1.default)(themeColor).isDark() ? "#FFF" : "#000")
        .fade(disabled ? 0.5 : 0)
        .toString();
    const variantStyle = (0, react_1.useMemo)(() => {
        if (variant === "outlined") {
            return {
                color: themeColor,
                borderColor: themeColor,
                borderWidth,
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
    const content = (0, react_1.useMemo)(() => {
        if (typeof children === "string") {
            return ((0, jsx_runtime_1.jsx)(Typography_1.Typography, { color: variantStyle["color"], children: children }));
        }
        return children;
    }, [children, variantStyle]);
    const sizeStyle = (0, react_1.useMemo)(() => {
        if (variant === "text")
            return {};
        if (size === "large") {
            return {
                borderRadius,
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
    const style = (0, react_1.useMemo)(() => [
        { width: "fit-content" },
        variantStyle,
        sizeStyle,
        props.style,
    ], [variantStyle, sizeStyle, props.style]);
    return ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { ...hover.handlers, disabled: disabled || !props.onPress, nativeID: "chip", ...props, style: style, children: content }));
});
exports.Chip.displayName = "Chip";
