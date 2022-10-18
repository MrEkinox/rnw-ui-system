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
exports.ListItem = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_native_1 = require("react-native");
var react_1 = require("react");
exports.ListItem = (0, react_1.memo)(function (_a) {
    var disabledPadding = _a.disabledPadding, disableGutters = _a.disableGutters, children = _a.children, props = __rest(_a, ["disabledPadding", "disableGutters", "children"]);
    var containerStyle = (0, react_1.useMemo)(function () { return [
        styles.container,
        props.style,
        !disabledPadding && { paddingVertical: 5 },
        !disableGutters && { paddingHorizontal: 5 },
    ]; }, [props.style, disabledPadding, disableGutters]);
    return ((0, jsx_runtime_1.jsx)(react_native_1.View, __assign({}, props, { style: containerStyle }, { children: children })));
});
var styles = react_native_1.StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "center",
    },
});
