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
exports.SelectFieldItem = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
var Typography_1 = require("../Typography");
var useHover_1 = require("../../hooks/useHover");
var useThemeStyle_1 = require("../../hooks/useThemeStyle");
var react_1 = require("react");
var color_1 = __importDefault(require("color"));
var react_native_1 = require("react-native");
exports.SelectFieldItem = (0, react_1.memo)(function (_a) {
    var children = _a.children, value = _a.value, onPress = _a.onPress, _b = _a.color, color = _b === void 0 ? "primary" : _b, selected = _a.selected, props = __rest(_a, ["children", "value", "onPress", "color", "selected"]);
    var hover = (0, useHover_1.useHover)();
    var style = (0, useThemeStyle_1.useThemeStyle)(function (theme) {
        var selectedColor = (0, color_1.default)(theme.palette[color] || color)
            .fade(0.8)
            .toString();
        return {
            paddingHorizontal: 20,
            paddingVertical: 10,
            backgroundColor: selected ? selectedColor : undefined,
            opacity: hover.isActive ? 0.5 : 1,
        };
    }, [color, selected, hover.isActive]);
    var onClick = (0, react_1.useCallback)(function () { return onPress === null || onPress === void 0 ? void 0 : onPress(value); }, [onPress, value]);
    return ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, __assign({ onPress: onClick }, hover.handlers, props, { style: style }, { children: typeof children === "string" ? ((0, jsx_runtime_1.jsx)(Typography_1.Typography, { children: children })) : (children) })));
});
exports.SelectFieldItem.displayName = "SelectFieldItem";
