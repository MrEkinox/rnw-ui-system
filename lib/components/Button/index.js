"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Button = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const react_native_1 = require("react-native");
const theme_1 = require("../../theme");
const color_1 = __importDefault(require("color"));
const useHover_1 = require("../../hooks/useHover");
const utils_1 = require("../../utils");
const Typography_1 = require("../Typography");
const getIconStyle = (position, size) => {
    if (size === "small") {
        return position === "start"
            ? { marginRight: 5, marginLeft: 0 }
            : { marginRight: 0, marginLeft: 5 };
    }
    return position === "start"
        ? { marginRight: 10, marginLeft: -5 }
        : { marginRight: -5, marginLeft: 10 };
};
exports.Button = (0, react_1.memo)(({ children, color = "primary", disabled, endIcon, startIcon, fullWidth, loadingPosition = "center", loadingIndicator, size = "medium", variant = "contained", loading, style = {}, ...props }) => {
    const theme = (0, theme_1.useTheme)();
    const hover = (0, useHover_1.useHover)();
    const isDisabled = disabled || loading;
    const fontStyle = theme.typography.button;
    const borderRadius = theme.borderRadius;
    const disabledColor = theme.palette.disabled;
    const themeColor = isDisabled
        ? disabledColor
        : theme.palette[color] || color;
    const containedColor = (0, color_1.default)((0, color_1.default)(themeColor).isDark() ? "#FFF" : "#000")
        .fade(isDisabled ? 0.5 : 0)
        .toString();
    const themeLoadingIndicator = (0, react_1.useMemo)(() => loadingIndicator || (0, jsx_runtime_1.jsx)(react_native_1.ActivityIndicator, { color: containedColor }), [loadingIndicator, containedColor]);
    const borderWidth = variant === "outlined" ? 2 : 0;
    const buttonStyle = (0, react_1.useMemo)(() => {
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
    }, [variant, hover.isActive, themeColor, containedColor, borderWidth]);
    const sizeStyle = (0, react_1.useMemo)(() => {
        if (variant === "text")
            return {};
        if (size === "large") {
            return {
                borderRadius,
                paddingHorizontal: 25 - borderWidth,
                paddingVertical: 15 - borderWidth,
                fontSize: 25,
            };
        }
        if (size === "small") {
            return {
                borderRadius: borderRadius / 2,
                paddingHorizontal: 10 - borderWidth,
                paddingVertical: 5 - borderWidth,
                fontSize: 17,
            };
        }
        return {
            borderRadius: borderRadius / 1.5,
            paddingHorizontal: 20 - borderWidth,
            paddingVertical: 10 - borderWidth,
            fontSize: 20,
        };
    }, [borderWidth, borderRadius, variant, size]);
    const isLoadingStart = loadingPosition === "start" && loading;
    const isLoadingCenter = loadingPosition === "center" && loading;
    const isLoadingEnd = loadingPosition === "end" && loading;
    const iconProps = (0, react_1.useMemo)(() => ({ color: buttonStyle?.["color"], size: sizeStyle?.["fontSize"] }), [buttonStyle, sizeStyle]);
    const content = (0, react_1.useMemo)(() => typeof children === "string" ? ((0, jsx_runtime_1.jsx)(Typography_1.Typography, { color: iconProps.color, style: fontStyle, selectable: false, children: children })) : ((0, utils_1.renderChildren)(children, iconProps)), [children, fontStyle, iconProps]);
    const startIconComponent = (0, react_1.useMemo)(() => {
        if (startIcon || isLoadingStart) {
            return ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: getIconStyle("start", size), children: isLoadingStart
                    ? themeLoadingIndicator
                    : (0, utils_1.renderIcon)(startIcon, iconProps) }));
        }
        return null;
    }, [iconProps, isLoadingStart, size, startIcon, themeLoadingIndicator]);
    const endIconComponent = (0, react_1.useMemo)(() => {
        if (endIcon || isLoadingEnd) {
            return ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: getIconStyle("end", size), children: isLoadingEnd
                    ? themeLoadingIndicator
                    : (0, utils_1.renderIcon)(endIcon, iconProps) }));
        }
        return null;
    }, [endIcon, iconProps, isLoadingEnd, size, themeLoadingIndicator]);
    const containerStyle = (0, react_1.useMemo)(() => [
        styles.container,
        !fullWidth && { width: "fit-content" },
        sizeStyle,
        buttonStyle,
        style,
    ], [buttonStyle, fullWidth, sizeStyle, style]);
    return ((0, jsx_runtime_1.jsxs)(react_native_1.Pressable, { ...hover.handlers, nativeID: "button", ...props, disabled: isDisabled, style: containerStyle, children: [startIconComponent, isLoadingCenter ? themeLoadingIndicator : content, endIconComponent] }));
});
exports.Button.displayName = "Button";
const styles = react_native_1.StyleSheet.create({
    container: {
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row",
    },
});
