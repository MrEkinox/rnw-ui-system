"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Fade = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const react_native_1 = require("react-native");
exports.Fade = (0, react_1.memo)(({ visible = true, children, delay, enabled, easing, duration = 100, onAnimationState, ...props }) => {
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
    const style = (0, react_1.useMemo)(() => [enabled && { opacity: animation }, props.style], [enabled, animation, props.style]);
    return ((0, jsx_runtime_1.jsx)(react_native_1.Animated.View, { nativeID: "Fade", ...props, style: style, children: children }));
});
exports.Fade.displayName = "Fade";
