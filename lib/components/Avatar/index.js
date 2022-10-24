"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Avatar = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const react_native_1 = require("react-native");
const theme_1 = require("../../theme");
const color_1 = __importDefault(require("color"));
const Badge_1 = require("../Badge");
const Typography_1 = require("../Typography");
const utils_1 = require("../../utils");
const computeText = (text) => {
    if (!text.includes(" ")) {
        return text.slice(0, 2);
    }
    return text
        .split(" ")
        .splice(0, 2)
        .map((ctext) => ctext[0])
        .join("");
};
exports.Avatar = (0, react_1.memo)(({ children, size = 50, variant, src, color = "primary", style, isOnline, ...props }) => {
    const theme = (0, theme_1.useTheme)();
    const borderRadius = theme.borderRadius / 1.5;
    const themeColor = theme.palette[color] || color;
    const fontSize = size / 2;
    const textStyle = (0, react_1.useMemo)(() => ({ fontSize }), [fontSize]);
    const content = (0, react_1.useMemo)(() => {
        const fontColor = (0, color_1.default)(themeColor).isDark() ? "#FFF" : "#000";
        if (typeof children === "string") {
            const text = computeText(children);
            return ((0, jsx_runtime_1.jsx)(Typography_1.Typography, { color: fontColor, style: textStyle, children: text }));
        }
        return (0, utils_1.renderChildren)(children, { color: fontColor, size: fontSize });
    }, [children, fontSize, textStyle, themeColor]);
    const variantBorderRadius = (0, react_1.useMemo)(() => {
        if (variant === "rounded")
            return borderRadius;
        if (variant === "square")
            return 0;
        return 900;
    }, [borderRadius, variant]);
    const containerStyle = (0, react_1.useMemo)(() => [
        styles.container,
        { borderRadius: variantBorderRadius, backgroundColor: themeColor },
        style,
    ], [themeColor, variantBorderRadius, style]);
    const sizeStyle = (0, react_1.useMemo)(() => [{ height: size, width: size }, style], [size, style]);
    const badgeStyle = (0, react_1.useMemo)(() => {
        if (variant === "rounded" || variant === "square")
            return { position: "absolute", top: -2, left: -2 };
        return { position: "absolute", top: 2, left: 2 };
    }, [variant]);
    const imgSrc = (0, react_1.useMemo)(() => (src ? { uri: src } : undefined), [src]);
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { nativeID: "avatar", style: sizeStyle, children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { ...props, style: containerStyle, children: [src && (0, jsx_runtime_1.jsx)(react_native_1.Image, { style: styles.img, source: imgSrc }), content] }), isOnline && (0, jsx_runtime_1.jsx)(Badge_1.Badge, { color: "success", style: badgeStyle })] }));
});
exports.Avatar.displayName = "Avatar";
const styles = react_native_1.StyleSheet.create({
    container: {
        height: "100%",
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
        overflow: "hidden",
    },
    img: { width: "100%", height: "100%", position: "absolute" },
});
