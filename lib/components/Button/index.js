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
exports.Button = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var react_native_1 = require("react-native");
var theme_1 = require("../../theme");
var color_1 = __importDefault(require("color"));
var useHover_1 = require("../../hooks/useHover");
var utils_1 = require("../../utils");
var Typography_1 = require("../Typography");
var getIconStyle = function (position, size) {
    if (size === "small") {
        return position === "start"
            ? { marginRight: 5, marginLeft: 0 }
            : { marginRight: 0, marginLeft: 5 };
    }
    return position === "start"
        ? { marginRight: 10, marginLeft: -5 }
        : { marginRight: -5, marginLeft: 10 };
};
exports.Button = (0, react_1.memo)(function (_a) {
    var children = _a.children, _b = _a.color, color = _b === void 0 ? "primary" : _b, disabled = _a.disabled, endIcon = _a.endIcon, startIcon = _a.startIcon, fullWidth = _a.fullWidth, _c = _a.loadingPosition, loadingPosition = _c === void 0 ? "center" : _c, loadingIndicator = _a.loadingIndicator, _d = _a.size, size = _d === void 0 ? "medium" : _d, _e = _a.variant, variant = _e === void 0 ? "contained" : _e, loading = _a.loading, _f = _a.style, style = _f === void 0 ? {} : _f, props = __rest(_a, ["children", "color", "disabled", "endIcon", "startIcon", "fullWidth", "loadingPosition", "loadingIndicator", "size", "variant", "loading", "style"]);
    var theme = (0, theme_1.useTheme)();
    var hover = (0, useHover_1.useHover)();
    var isDisabled = disabled || loading;
    var fontStyle = theme.typography.button;
    var borderRadius = theme.borderRadius;
    var disabledColor = theme.palette.disabled;
    var themeColor = isDisabled
        ? disabledColor
        : theme.palette[color] || color;
    var containedColor = (0, color_1.default)((0, color_1.default)(themeColor).isDark() ? "#FFF" : "#000")
        .fade(isDisabled ? 0.5 : 0)
        .toString();
    var themeLoadingIndicator = (0, react_1.useMemo)(function () { return loadingIndicator || (0, jsx_runtime_1.jsx)(react_native_1.ActivityIndicator, { color: containedColor }); }, [loadingIndicator, containedColor]);
    var borderWidth = variant === "outlined" ? 2 : 0;
    var buttonStyle = (0, react_1.useMemo)(function () {
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
    }, [variant, hover.isActive, themeColor, containedColor, borderWidth]);
    var sizeStyle = (0, react_1.useMemo)(function () {
        if (variant === "text")
            return {};
        if (size === "large") {
            return {
                borderRadius: borderRadius,
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
    var isLoadingStart = loadingPosition === "start" && loading;
    var isLoadingCenter = loadingPosition === "center" && loading;
    var isLoadingEnd = loadingPosition === "end" && loading;
    var iconProps = (0, react_1.useMemo)(function () { return ({ color: buttonStyle === null || buttonStyle === void 0 ? void 0 : buttonStyle["color"], size: sizeStyle === null || sizeStyle === void 0 ? void 0 : sizeStyle["fontSize"] }); }, [buttonStyle, sizeStyle]);
    var content = (0, react_1.useMemo)(function () {
        return typeof children === "string" ? ((0, jsx_runtime_1.jsx)(Typography_1.Typography, __assign({ color: iconProps.color, style: fontStyle, selectable: false }, { children: children }))) : ((0, utils_1.renderChildren)(children, iconProps));
    }, [children, fontStyle, iconProps]);
    var startIconComponent = (0, react_1.useMemo)(function () {
        if (startIcon || isLoadingStart) {
            return ((0, jsx_runtime_1.jsx)(react_native_1.View, __assign({ style: getIconStyle("start", size) }, { children: isLoadingStart
                    ? themeLoadingIndicator
                    : (0, utils_1.renderIcon)(startIcon, iconProps) })));
        }
        return null;
    }, [iconProps, isLoadingStart, size, startIcon, themeLoadingIndicator]);
    var endIconComponent = (0, react_1.useMemo)(function () {
        if (endIcon || isLoadingEnd) {
            return ((0, jsx_runtime_1.jsx)(react_native_1.View, __assign({ style: getIconStyle("end", size) }, { children: isLoadingEnd
                    ? themeLoadingIndicator
                    : (0, utils_1.renderIcon)(endIcon, iconProps) })));
        }
        return null;
    }, [endIcon, iconProps, isLoadingEnd, size, themeLoadingIndicator]);
    var containerStyle = (0, react_1.useMemo)(function () { return [
        styles.container,
        !fullWidth && { width: "fit-content" },
        sizeStyle,
        buttonStyle,
        style,
    ]; }, [buttonStyle, fullWidth, sizeStyle, style]);
    return ((0, jsx_runtime_1.jsxs)(react_native_1.Pressable, __assign({}, hover.handlers, { nativeID: "button" }, props, { disabled: isDisabled, style: containerStyle }, { children: [startIconComponent, isLoadingCenter ? themeLoadingIndicator : content, endIconComponent] })));
});
exports.Button.displayName = "Button";
var styles = react_native_1.StyleSheet.create({
    container: {
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row",
    },
});
