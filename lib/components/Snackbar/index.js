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
exports.Snackbar = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var Card_1 = require("../Card");
var theme_1 = require("../../theme");
var Typography_1 = require("../Typography");
var color_1 = __importDefault(require("color"));
var Icon_1 = require("../Icon");
var react_native_1 = require("react-native");
var utils_1 = require("../../utils");
exports.Snackbar = (0, react_1.memo)(function (_a) {
    var _b = _a.color, color = _b === void 0 ? "#000" : _b, _c = _a.icon, icon = _c === void 0 ? true : _c, message = _a.message, style = _a.style, children = _a.children, props = __rest(_a, ["color", "icon", "message", "style", "children"]);
    var theme = (0, theme_1.useTheme)();
    var themeColor = theme.palette[color] || color;
    var fontColor = (0, color_1.default)(themeColor).isDark() ? "#FFF" : "#000";
    var iconContent = (0, react_1.useMemo)(function () {
        if (icon === false)
            return;
        switch (color) {
            case "success":
                return ((0, jsx_runtime_1.jsx)(Icon_1.Icon, { type: "Ionicons", color: fontColor, name: "checkmark-circle" }));
            case "error":
                return (0, jsx_runtime_1.jsx)(Icon_1.Icon, { type: "Ionicons", color: fontColor, name: "alert-circle" });
            case "warning":
                return (0, jsx_runtime_1.jsx)(Icon_1.Icon, { type: "Ionicons", color: fontColor, name: "warning" });
            case "info":
                return ((0, jsx_runtime_1.jsx)(Icon_1.Icon, { type: "Ionicons", color: fontColor, name: "information-circle" }));
        }
        if (typeof icon !== "boolean")
            return (0, utils_1.renderIcon)(icon, { color: fontColor });
    }, [color, fontColor, icon]);
    var containerStyle = (0, react_1.useMemo)(function () { return [
        styles.container,
        { backgroundColor: themeColor },
        style,
    ]; }, [style, themeColor]);
    return ((0, jsx_runtime_1.jsxs)(Card_1.Card, __assign({ style: containerStyle }, props, { children: [iconContent && (0, jsx_runtime_1.jsx)(react_native_1.View, __assign({ style: styles.icon }, { children: iconContent })), typeof message === "string" ? ((0, jsx_runtime_1.jsx)(Typography_1.Typography, __assign({ color: fontColor, variant: "subtitle2" }, { children: message }))) : (message), children] })));
});
exports.Snackbar.displayName = "Snackbar";
var styles = react_native_1.StyleSheet.create({
    icon: {
        marginRight: 10,
    },
    container: {
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 15,
        paddingVertical: 10,
        width: "fit-content",
    },
});
