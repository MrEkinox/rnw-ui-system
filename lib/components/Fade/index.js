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
export const Fade = memo((_a) => {
    var { visible = true, children, delay, enabled, easing, duration = 100, onAnimationState } = _a, props = __rest(_a, ["visible", "children", "delay", "enabled", "easing", "duration", "onAnimationState"]);
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
    const style = useMemo(() => [enabled && { opacity: animation }, props.style], [enabled, animation, props.style]);
    return (_jsx(Animated.View, Object.assign({ nativeID: "Fade" }, props, { style: style }, { children: children })));
});
Fade.displayName = "Fade";
