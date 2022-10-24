import { jsx as _jsx } from "react/jsx-runtime";
import { memo, useEffect, useMemo } from "react";
import { Animated } from "react-native";
export const Fade = memo(({ visible = true, children, delay, enabled, easing, duration = 100, onAnimationState, ...props }) => {
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
    const style = useMemo(() => [enabled && { opacity: animation }, props.style], [enabled, animation, props.style]);
    return (_jsx(Animated.View, { nativeID: "Fade", ...props, style: style, children: children }));
});
Fade.displayName = "Fade";
