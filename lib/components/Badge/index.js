"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Badge = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const react_native_1 = require("react-native");
const theme_1 = require("../../theme");
const color_1 = __importDefault(require("color"));
const Typography_1 = require("../Typography");
exports.Badge = (0, react_1.memo)(({ children, size = 5, color = "primary", ...props }) => {
    const theme = (0, theme_1.useTheme)();
    const themeColor = theme.palette[color] || color;
    const content = (0, react_1.useMemo)(() => {
        if (typeof children === "string") {
            const fontColor = (0, color_1.default)(themeColor).isDark() ? "#FFF" : "#000";
            return (0, jsx_runtime_1.jsx)(Typography_1.Typography, { color: fontColor, children: children });
        }
        return children;
    }, [children, themeColor]);
    const style = (0, react_1.useMemo)(() => [
        styles.container,
        { backgroundColor: themeColor, padding: size },
        props.style,
    ], [size, props.style, themeColor]);
    return ((0, jsx_runtime_1.jsx)(react_native_1.View, { nativeID: "badge", ...props, style: style, children: content }));
});
exports.Badge.displayName = "Badge";
const styles = react_native_1.StyleSheet.create({
    container: {
        borderRadius: 500,
        width: "fit-content",
    },
});
