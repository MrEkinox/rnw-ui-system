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
exports.IconButton = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var Button_1 = require("../Button");
exports.IconButton = (0, react_1.memo)(function (_a) {
    var _b = _a.size, size = _b === void 0 ? "medium" : _b, children = _a.children, style = _a.style, props = __rest(_a, ["size", "children", "style"]);
    var sizeStyle = (0, react_1.useMemo)(function () {
        if (size === "large")
            return { paddingHorizontal: 15, paddingVertical: 15 };
        if (size === "small")
            return { paddingHorizontal: 8, paddingVertical: 8 };
        return { paddingHorizontal: 10, paddingVertical: 10 };
    }, [size]);
    var containerStyle = (0, react_1.useMemo)(function () { return [
        { aspectRatio: 1, borderRadius: 999 },
        sizeStyle,
        style,
    ]; }, [sizeStyle, style]);
    return ((0, jsx_runtime_1.jsx)(Button_1.Button, __assign({}, props, { size: size, style: containerStyle }, { children: children })));
});
exports.IconButton.displayName = "IconButton";
