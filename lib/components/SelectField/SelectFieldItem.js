"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SelectFieldItem = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const Typography_1 = require("../Typography");
const useHover_1 = require("../../hooks/useHover");
const useThemeStyle_1 = require("../../hooks/useThemeStyle");
const react_1 = require("react");
const color_1 = __importDefault(require("color"));
const react_native_1 = require("react-native");
exports.SelectFieldItem = (0, react_1.memo)(({ children, value, onPress, color = "primary", selected, ...props }) => {
    const hover = (0, useHover_1.useHover)();
    const style = (0, useThemeStyle_1.useThemeStyle)((theme) => {
        const selectedColor = (0, color_1.default)(theme.palette[color] || color)
            .fade(0.8)
            .toString();
        return {
            paddingHorizontal: 20,
            paddingVertical: 10,
            backgroundColor: selected ? selectedColor : undefined,
            opacity: hover.isActive ? 0.5 : 1,
        };
    }, [color, selected, hover.isActive]);
    const onClick = (0, react_1.useCallback)(() => onPress?.(value), [onPress, value]);
    return ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { onPress: onClick, ...hover.handlers, ...props, style: style, children: typeof children === "string" ? ((0, jsx_runtime_1.jsx)(Typography_1.Typography, { children: children })) : (children) }));
});
exports.SelectFieldItem.displayName = "SelectFieldItem";
