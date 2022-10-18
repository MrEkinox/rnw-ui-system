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
exports.SliderField = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var react_native_1 = require("react-native");
var TextField_1 = require("../TextField");
var Slider_1 = require("../Slider");
var theme_1 = require("../../theme");
var useThemeStyle_1 = require("../../hooks/useThemeStyle");
exports.SliderField = (0, react_1.memo)(function (_a) {
    var disabled = _a.disabled, value = _a.value, required = _a.required, error = _a.error, minValue = _a.minValue, _b = _a.color, color = _b === void 0 ? "primary" : _b, containerStyle = _a.containerStyle, helperText = _a.helperText, onChange = _a.onChange, label = _a.label, props = __rest(_a, ["disabled", "value", "required", "error", "minValue", "color", "containerStyle", "helperText", "onChange", "label"]);
    var theme = (0, theme_1.useTheme)();
    var currentValue = value || minValue;
    var themeColor = theme.palette[error ? "error" : color] || color;
    var disabledColor = theme.palette.disabled;
    var onChangeValue = (0, react_1.useCallback)(function (newValue) { return onChange === null || onChange === void 0 ? void 0 : onChange(newValue); }, [onChange]);
    var currentColor = disabled ? disabledColor : themeColor;
    var style = (0, useThemeStyle_1.useThemeStyle)(function (curTheme) { return [
        styles.container,
        {
            borderColor: currentColor,
            borderRadius: curTheme.borderRadius / 1.5,
        },
        containerStyle,
    ]; }, [containerStyle, currentColor]);
    var getLabel = (0, react_1.useCallback)(function (curValue) { return Math.floor(curValue); }, []);
    return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(react_native_1.View, __assign({ style: style }, { children: (0, jsx_runtime_1.jsxs)(react_native_1.View, __assign({ style: styles.flex }, { children: [(0, jsx_runtime_1.jsx)(TextField_1.TextFieldLabel, __assign({ required: required, isActive: true, disabled: disabled, color: color, error: error }, { children: label })), (0, jsx_runtime_1.jsx)(react_native_1.View, __assign({ style: styles.slider }, { children: (0, jsx_runtime_1.jsx)(Slider_1.Slider, __assign({}, props, { minValue: minValue, disabled: disabled, value: currentValue, getLabel: getLabel, onChange: onChangeValue })) }))] })) })), (0, jsx_runtime_1.jsx)(TextField_1.TextFieldHelper, __assign({ color: color, error: error }, { children: helperText }))] }));
});
exports.SliderField.displayName = "SliderField";
var styles = react_native_1.StyleSheet.create({
    slider: {
        flex: 1,
        justifyContent: "center",
    },
    flex: {
        flex: 1,
        height: "100%",
        paddingHorizontal: 10,
    },
    container: {
        borderWidth: 2,
        padding: 5,
        minHeight: 44,
        alignItems: "center",
        flexDirection: "row",
    },
});
