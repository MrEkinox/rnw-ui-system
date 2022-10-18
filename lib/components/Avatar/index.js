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
exports.Avatar = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var react_native_1 = require("react-native");
var theme_1 = require("../../theme");
var color_1 = __importDefault(require("color"));
var Badge_1 = require("../Badge");
var Typography_1 = require("../Typography");
var utils_1 = require("../../utils");
var computeText = function (text) {
    if (!text.includes(" ")) {
        return text.slice(0, 2);
    }
    return text
        .split(" ")
        .splice(0, 2)
        .map(function (ctext) { return ctext[0]; })
        .join("");
};
exports.Avatar = (0, react_1.memo)(function (_a) {
    var children = _a.children, _b = _a.size, size = _b === void 0 ? 50 : _b, variant = _a.variant, src = _a.src, _c = _a.color, color = _c === void 0 ? "primary" : _c, style = _a.style, isOnline = _a.isOnline, props = __rest(_a, ["children", "size", "variant", "src", "color", "style", "isOnline"]);
    var theme = (0, theme_1.useTheme)();
    var borderRadius = theme.borderRadius / 1.5;
    var themeColor = theme.palette[color] || color;
    var fontSize = size / 2;
    var textStyle = (0, react_1.useMemo)(function () { return ({ fontSize: fontSize }); }, [fontSize]);
    var content = (0, react_1.useMemo)(function () {
        var fontColor = (0, color_1.default)(themeColor).isDark() ? "#FFF" : "#000";
        if (typeof children === "string") {
            var text = computeText(children);
            return ((0, jsx_runtime_1.jsx)(Typography_1.Typography, __assign({ color: fontColor, style: textStyle }, { children: text })));
        }
        return (0, utils_1.renderChildren)(children, { color: fontColor, size: fontSize });
    }, [children, fontSize, textStyle, themeColor]);
    var variantBorderRadius = (0, react_1.useMemo)(function () {
        if (variant === "rounded")
            return borderRadius;
        if (variant === "square")
            return 0;
        return 900;
    }, [borderRadius, variant]);
    var containerStyle = (0, react_1.useMemo)(function () { return [
        styles.container,
        { borderRadius: variantBorderRadius, backgroundColor: themeColor },
        style,
    ]; }, [themeColor, variantBorderRadius, style]);
    var sizeStyle = (0, react_1.useMemo)(function () { return [{ height: size, width: size }, style]; }, [size, style]);
    var badgeStyle = (0, react_1.useMemo)(function () {
        if (variant === "rounded" || variant === "square")
            return { position: "absolute", top: -2, left: -2 };
        return { position: "absolute", top: 2, left: 2 };
    }, [variant]);
    var imgSrc = (0, react_1.useMemo)(function () { return (src ? { uri: src } : undefined); }, [src]);
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, __assign({ nativeID: "avatar", style: sizeStyle }, { children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, __assign({}, props, { style: containerStyle }, { children: [src && (0, jsx_runtime_1.jsx)(react_native_1.Image, { style: styles.img, source: imgSrc }), content] })), isOnline && (0, jsx_runtime_1.jsx)(Badge_1.Badge, { color: "success", style: badgeStyle })] })));
});
exports.Avatar.displayName = "Avatar";
var styles = react_native_1.StyleSheet.create({
    container: {
        height: "100%",
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
        overflow: "hidden",
    },
    img: { width: "100%", height: "100%", position: "absolute" },
});
