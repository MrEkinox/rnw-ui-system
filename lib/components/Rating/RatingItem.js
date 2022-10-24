"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RatingItem = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const useHover_1 = require("../../hooks/useHover");
const react_1 = require("react");
const react_native_1 = require("react-native");
const Icon_1 = require("../Icon");
exports.RatingItem = (0, react_1.memo)(({ iconProps, size, color, onPress, value, ...props }) => {
    const hover = (0, useHover_1.useHover)();
    const style = (0, react_1.useMemo)(() => [
        { opacity: hover.isActive ? 0.5 : 1 },
        props.style,
    ], [hover.isActive, props.style]);
    const onClick = (0, react_1.useCallback)(() => onPress?.(value), [onPress, value]);
    return ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { onPress: onClick, ...hover.handlers, ...props, style: style, children: (0, jsx_runtime_1.jsx)(Icon_1.Icon, { type: "Ionicons", name: "ios-star", color: color, size: size, ...iconProps }) }));
});
exports.RatingItem.displayName = "RatingItem";
