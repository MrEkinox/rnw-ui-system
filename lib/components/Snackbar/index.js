"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Snackbar = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const Card_1 = require("../Card");
const theme_1 = require("../../theme");
const Typography_1 = require("../Typography");
const color_1 = __importDefault(require("color"));
const Icon_1 = require("../Icon");
const react_native_1 = require("react-native");
const utils_1 = require("../../utils");
exports.Snackbar = (0, react_1.memo)(({ color = "#000", icon = true, message, style, children, ...props }) => {
    const theme = (0, theme_1.useTheme)();
    const themeColor = theme.palette[color] || color;
    const fontColor = (0, color_1.default)(themeColor).isDark() ? "#FFF" : "#000";
    const iconContent = (0, react_1.useMemo)(() => {
        if (icon === false)
            return;
        switch (color) {
            case "success":
                return ((0, jsx_runtime_1.jsx)(Icon_1.Icon, { type: "Ionicons", color: fontColor, name: "checkmark-circle" }));
            case "error":
                return (0, jsx_runtime_1.jsx)(Icon_1.Icon, { type: "Ionicons", color: fontColor, name: "alert-circle" });
            case "warning":
                return (0, jsx_runtime_1.jsx)(Icon_1.Icon, { type: "Ionicons", color: fontColor, name: "warning" });
            case "info":
                return ((0, jsx_runtime_1.jsx)(Icon_1.Icon, { type: "Ionicons", color: fontColor, name: "information-circle" }));
        }
        if (typeof icon !== "boolean")
            return (0, utils_1.renderIcon)(icon, { color: fontColor });
    }, [color, fontColor, icon]);
    const containerStyle = (0, react_1.useMemo)(() => [
        styles.container,
        { backgroundColor: themeColor },
        style,
    ], [style, themeColor]);
    return ((0, jsx_runtime_1.jsxs)(Card_1.Card, { style: containerStyle, ...props, children: [iconContent && (0, jsx_runtime_1.jsx)(react_native_1.View, { style: styles.icon, children: iconContent }), typeof message === "string" ? ((0, jsx_runtime_1.jsx)(Typography_1.Typography, { color: fontColor, variant: "subtitle2", children: message })) : (message), children] }));
});
exports.Snackbar.displayName = "Snackbar";
const styles = react_native_1.StyleSheet.create({
    icon: {
        marginRight: 10,
    },
    container: {
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 15,
        paddingVertical: 10,
        width: "fit-content",
    },
});
