import { jsx as _jsx } from "react/jsx-runtime";
import { memo, useEffect, useMemo } from "react";
import { Animated } from "react-native";
export const Grow = memo(({ visible = true, children, delay, enabled, transformOrigin = "50% 0", easing, duration = 200, onAnimationState, ...props }) => {
    const animation = useMemo(() => new Animated.Value(0), []);
    useEffect(() => {
        if (enabled)
            Animated.timing(animation, {
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
    const style = useMemo(() => [
        enabled && { transform: [{ scale: animation }], transformOrigin },
        props.style,
    ], [enabled, animation, props.style, transformOrigin]);
    return (_jsx(Animated.View, { nativeID: "grow", ...props, style: style, children: children }));
});
Grow.displayName = "Grow";
