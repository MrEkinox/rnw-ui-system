"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Grow = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const react_native_1 = require("react-native");
exports.Grow = (0, react_1.memo)(({ visible = true, children, delay, enabled, transformOrigin = "50% 0", easing, duration = 200, onAnimationState, ...props }) => {
    const animation = (0, react_1.useMemo)(() => new react_native_1.Animated.Value(0), []);
    (0, react_1.useEffect)(() => {
        if (enabled)
            react_native_1.Animated.timing(animation, {
                toValue: visible ? 1 : 0,
                duration,
                delay,
                easing,
                useNativeDriver: false,
            }).start(() => onAnimationState?.(visible));
    }, [
        animation,
        enabled,
        delay,
        easing,
        duration,
        visible,
        onAnimationState,
    ]);
    const style = (0, react_1.useMemo)(() => [
        enabled && { transform: [{ scale: animation }], transformOrigin },
        props.style,
    ], [enabled, animation, props.style, transformOrigin]);
    return ((0, jsx_runtime_1.jsx)(react_native_1.Animated.View, { nativeID: "grow", ...props, style: style, children: children }));
});
exports.Grow.displayName = "Grow";
