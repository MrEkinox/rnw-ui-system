var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
import { jsx as _jsx } from "react/jsx-runtime";
import { memo, useEffect, useMemo } from "react";
import { Animated } from "react-native";
export const Grow = memo((_a) => {
    var { visible = true, children, delay, enabled, transformOrigin = "50% 0", easing, duration = 200, onAnimationState } = _a, props = __rest(_a, ["visible", "children", "delay", "enabled", "transformOrigin", "easing", "duration", "onAnimationState"]);
    const animation = useMemo(() => new Animated.Value(0), []);
    useEffect(() => {
        if (enabled)
            Animated.timing(animation, {
                toValue: visible ? 1 : 0,
                duration,
                delay,
                easing,
                useNativeDriver: false,
            }).start(() => onAnimationState === null || onAnimationState === void 0 ? void 0 : onAnimationState(visible));
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
    return (_jsx(Animated.View, Object.assign({ nativeID: "grow" }, props, { style: style }, { children: children })));
});
Grow.displayName = "Grow";
