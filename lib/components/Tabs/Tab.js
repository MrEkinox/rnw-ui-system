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
exports.Tab = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
var Typography_1 = require("../Typography");
var useHover_1 = require("../../hooks/useHover");
var theme_1 = require("../../theme");
var react_1 = require("react");
var react_native_1 = require("react-native");
var color_1 = __importDefault(require("color"));
exports.Tab = (0, react_1.memo)(function (_a) {
    var color = _a.color, selected = _a.selected, value = _a.value, children = _a.children, onPress = _a.onPress, onLayout = _a.onLayout, props = __rest(_a, ["color", "selected", "value", "children", "onPress", "onLayout"]);
    var hover = (0, useHover_1.useHover)();
    var theme = (0, theme_1.useTheme)();
    var backgroundColor = theme.palette.background.card;
    var fondColor = selected ? color : backgroundColor;
    var style = (0, react_1.useMemo)(function () { return ({
        opacity: hover.isActive ? 0.5 : 1,
        paddingVertical: 10,
        paddingHorizontal: 20,
    }); }, [hover.isActive]);
    var onSelectTab = (0, react_1.useCallback)(function () { return onPress(value); }, [onPress, value]);
    var onLayoutTab = (0, react_1.useCallback)(function (e) { return onLayout(value, e); }, [onLayout, value]);
    return ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, __assign({ onPress: onSelectTab, onLayout: onLayoutTab }, hover.handlers, props, { style: style }, { children: (0, jsx_runtime_1.jsx)(Typography_1.Typography, __assign({ color: (0, color_1.default)(fondColor).isDark() ? "#FFF" : "#000" }, { children: children })) })));
});
exports.Tab.displayName = "Tab";
