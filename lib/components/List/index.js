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
exports.List = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var react_native_1 = require("react-native");
var Typography_1 = require("../Typography");
exports.List = (0, react_1.memo)(function (_a) {
    var children = _a.children, header = _a.header, footer = _a.footer, hearderTextProps = _a.hearderTextProps, footerTextProps = _a.footerTextProps, props = __rest(_a, ["children", "header", "footer", "hearderTextProps", "footerTextProps"]);
    var headerComponent = (0, react_1.useMemo)(function () {
        if (typeof header !== "string")
            return header;
        return ((0, jsx_runtime_1.jsx)(Typography_1.Typography, __assign({ style: styles.padding, variant: "overline" }, hearderTextProps, { children: header })));
    }, [header, hearderTextProps]);
    var footerComponent = (0, react_1.useMemo)(function () {
        if (typeof footer !== "string")
            return footer;
        return ((0, jsx_runtime_1.jsx)(Typography_1.Typography, __assign({ style: styles.padding, variant: "overline" }, footerTextProps, { children: footer })));
    }, [footer, footerTextProps]);
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, __assign({ nativeID: "List" }, props, { children: [headerComponent, children, footerComponent] })));
});
exports.List.displayName = "List";
var styles = react_native_1.StyleSheet.create({
    padding: {
        padding: 10,
    },
});
