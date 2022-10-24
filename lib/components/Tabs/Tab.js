"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Tab = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const Typography_1 = require("../Typography");
const useHover_1 = require("../../hooks/useHover");
const theme_1 = require("../../theme");
const react_1 = require("react");
const react_native_1 = require("react-native");
const color_1 = __importDefault(require("color"));
exports.Tab = (0, react_1.memo)(({ color, selected, value, children, onPress, onLayout, ...props }) => {
    const hover = (0, useHover_1.useHover)();
    const theme = (0, theme_1.useTheme)();
    const backgroundColor = theme.palette.background.card;
    const fondColor = selected ? color : backgroundColor;
    const style = (0, react_1.useMemo)(() => ({
        opacity: hover.isActive ? 0.5 : 1,
        paddingVertical: 10,
        paddingHorizontal: 20,
    }), [hover.isActive]);
    const onSelectTab = (0, react_1.useCallback)(() => onPress(value), [onPress, value]);
    const onLayoutTab = (0, react_1.useCallback)((e) => onLayout(value, e), [onLayout, value]);
    return ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { onPress: onSelectTab, onLayout: onLayoutTab, ...hover.handlers, ...props, style: style, children: (0, jsx_runtime_1.jsx)(Typography_1.Typography, { color: (0, color_1.default)(fondColor).isDark() ? "#FFF" : "#000", children: children }) }));
});
exports.Tab.displayName = "Tab";
