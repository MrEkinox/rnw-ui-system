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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Badge = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var react_native_1 = require("react-native");
var theme_1 = require("../../theme");
var color_1 = __importDefault(require("color"));
var Typography_1 = require("../Typography");
exports.Badge = (0, react_1.memo)(function (_a) {
    var children = _a.children, _b = _a.size, size = _b === void 0 ? 5 : _b, _c = _a.color, color = _c === void 0 ? "primary" : _c, props = __rest(_a, ["children", "size", "color"]);
    var theme = (0, theme_1.useTheme)();
    var themeColor = theme.palette[color] || color;
    var content = (0, react_1.useMemo)(function () {
        if (typeof children === "string") {
            var fontColor = (0, color_1.default)(themeColor).isDark() ? "#FFF" : "#000";
            return (0, jsx_runtime_1.jsx)(Typography_1.Typography, __assign({ color: fontColor }, { children: children }));
        }
        return children;
    }, [children, themeColor]);
    var style = (0, react_1.useMemo)(function () { return [
        styles.container,
        { backgroundColor: themeColor, padding: size },
        props.style,
    ]; }, [size, props.style, themeColor]);
    return ((0, jsx_runtime_1.jsx)(react_native_1.View, __assign({ nativeID: "badge" }, props, { style: style }, { children: content })));
});
exports.Badge.displayName = "Badge";
var styles = react_native_1.StyleSheet.create({
    container: {
        borderRadius: 500,
        width: "fit-content",
    },
});
