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
exports.Checkbox = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var react_native_1 = require("react-native");
var theme_1 = require("../../theme");
var Icon_1 = require("../Icon");
var color_1 = __importDefault(require("color"));
var useHover_1 = require("../../hooks/useHover");
var Typography_1 = require("../Typography");
exports.Checkbox = (0, react_1.memo)(function (_a) {
    var disabled = _a.disabled, _b = _a.color, color = _b === void 0 ? "primary" : _b, _c = _a.value, value = _c === void 0 ? false : _c, onChange = _a.onChange, label = _a.label, style = _a.style, props = __rest(_a, ["disabled", "color", "value", "onChange", "label", "style"]);
    var theme = (0, theme_1.useTheme)();
    var borderRadius = theme.borderRadius / 2;
    var disabledColor = theme.palette.disabled;
    var themeColor = disabled ? disabledColor : theme.palette[color] || color;
    var iconColor = (0, color_1.default)(themeColor).isDark() ? "#FFF" : "#000";
    var hover = (0, useHover_1.useHover)();
    var onClick = (0, react_1.useCallback)(function () { return onChange === null || onChange === void 0 ? void 0 : onChange(!value); }, [value, onChange]);
    var opacity = value ? 1 : hover.isActive ? 0.5 : 0;
    var containerStyle = (0, react_1.useMemo)(function () { return [
        styles.container,
        { borderRadius: borderRadius, backgroundColor: themeColor },
        style,
    ]; }, [borderRadius, style, themeColor]);
    var iconStyle = (0, react_1.useMemo)(function () { return ({ opacity: opacity }); }, [opacity]);
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, __assign({ style: styles.flex }, { children: [(0, jsx_runtime_1.jsxs)(react_native_1.Pressable, __assign({}, hover.handlers, { nativeID: "checkbox" }, props, { onPress: onClick, disabled: disabled, style: containerStyle }, { children: [react_native_1.Platform.OS === "web" && ((0, jsx_runtime_1.jsx)("input", { hidden: true, type: "checkbox", disabled: disabled, onChange: onClick, value: "".concat(value) })), (0, jsx_runtime_1.jsx)(Icon_1.Icon, { style: iconStyle, type: "Ionicons", name: "checkmark", color: iconColor })] })), label && ((0, jsx_runtime_1.jsx)(Typography_1.Typography, __assign({ variant: "body1", style: styles.label }, { children: label })))] })));
});
exports.Checkbox.displayName = "Checkbox";
var styles = react_native_1.StyleSheet.create({
    flex: { flexDirection: "row", alignItems: "center", flexWrap: "wrap" },
    label: { marginLeft: 10 },
    container: {
        justifyContent: "center",
        alignItems: "center",
        width: 25,
        height: 25,
    },
});
