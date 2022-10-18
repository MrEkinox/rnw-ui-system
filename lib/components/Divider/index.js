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
exports.Divider = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var react_native_1 = require("react-native");
var theme_1 = require("../../theme");
exports.Divider = (0, react_1.memo)(function (_a) {
    var orientation = _a.orientation, variant = _a.variant, style = _a.style, _b = _a.color, color = _b === void 0 ? "divider" : _b, props = __rest(_a, ["orientation", "variant", "style", "color"]);
    var theme = (0, theme_1.useTheme)();
    var backgroundColor = theme.palette[color] || color;
    var size = variant === "middle" ? "80%" : "100%";
    var containerStyle = (0, react_1.useMemo)(function () { return [
        { backgroundColor: backgroundColor, alignSelf: "center" },
        orientation === "vertical"
            ? { width: react_native_1.StyleSheet.hairlineWidth, height: size }
            : { height: react_native_1.StyleSheet.hairlineWidth, width: size },
        style,
    ]; }, [backgroundColor, orientation, size, style]);
    return (0, jsx_runtime_1.jsx)(react_native_1.View, __assign({}, props, { style: containerStyle }));
});
exports.Divider.displayName = "Divider";
