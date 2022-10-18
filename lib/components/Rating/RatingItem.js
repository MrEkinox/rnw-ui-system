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
exports.RatingItem = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
var useHover_1 = require("../../hooks/useHover");
var react_1 = require("react");
var react_native_1 = require("react-native");
var Icon_1 = require("../Icon");
exports.RatingItem = (0, react_1.memo)(function (_a) {
    var iconProps = _a.iconProps, size = _a.size, color = _a.color, onPress = _a.onPress, value = _a.value, props = __rest(_a, ["iconProps", "size", "color", "onPress", "value"]);
    var hover = (0, useHover_1.useHover)();
    var style = (0, react_1.useMemo)(function () { return [
        { opacity: hover.isActive ? 0.5 : 1 },
        props.style,
    ]; }, [hover.isActive, props.style]);
    var onClick = (0, react_1.useCallback)(function () { return onPress === null || onPress === void 0 ? void 0 : onPress(value); }, [onPress, value]);
    return ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, __assign({ onPress: onClick }, hover.handlers, props, { style: style }, { children: (0, jsx_runtime_1.jsx)(Icon_1.Icon, __assign({ type: "Ionicons", name: "ios-star", color: color, size: size }, iconProps)) })));
});
exports.RatingItem.displayName = "RatingItem";
