"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Fade = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var react_native_1 = require("react-native");
exports.Fade = (0, react_1.memo)(function (_a) {
    var _b = _a.visible, visible = _b === void 0 ? true : _b, children = _a.children, delay = _a.delay, enabled = _a.enabled, easing = _a.easing, _c = _a.duration, duration = _c === void 0 ? 100 : _c, onAnimationState = _a.onAnimationState, props = __rest(_a, ["visible", "children", "delay", "enabled", "easing", "duration", "onAnimationState"]);
    var animation = (0, react_1.useMemo)(function () { return new react_native_1.Animated.Value(0); }, []);
    (0, react_1.useEffect)(function () {
        if (enabled)
            react_native_1.Animated.timing(animation, {
                toValue: visible ? 1 : 0,
                duration: duration,
                delay: delay,
                easing: easing,
                useNativeDriver: false,
            }).start(function () { return onAnimationState === null || onAnimationState === void 0 ? void 0 : onAnimationState(visible); });
    }, [
        animation,
        enabled,
        delay,
        easing,
        duration,
        visible,
        onAnimationState,
    ]);
    var style = (0, react_1.useMemo)(function () { return [enabled && { opacity: animation }, props.style]; }, [enabled, animation, props.style]);
    return ((0, jsx_runtime_1.jsx)(react_native_1.Animated.View, __assign({ nativeID: "Fade" }, props, { style: style }, { children: children })));
});
exports.Fade.displayName = "Fade";
