"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Divider = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const react_native_1 = require("react-native");
const theme_1 = require("../../theme");
exports.Divider = (0, react_1.memo)(({ orientation, variant, style, color = "divider", ...props }) => {
    const theme = (0, theme_1.useTheme)();
    const backgroundColor = theme.palette[color] || color;
    const size = variant === "middle" ? "80%" : "100%";
    const containerStyle = (0, react_1.useMemo)(() => [
        { backgroundColor, alignSelf: "center" },
        orientation === "vertical"
            ? { width: react_native_1.StyleSheet.hairlineWidth, height: size }
            : { height: react_native_1.StyleSheet.hairlineWidth, width: size },
        style,
    ], [backgroundColor, orientation, size, style]);
    return (0, jsx_runtime_1.jsx)(react_native_1.View, { ...props, style: containerStyle });
});
exports.Divider.displayName = "Divider";
