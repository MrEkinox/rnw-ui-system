"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SliderField = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const react_native_1 = require("react-native");
const TextField_1 = require("../TextField");
const Slider_1 = require("../Slider");
const theme_1 = require("../../theme");
const useThemeStyle_1 = require("../../hooks/useThemeStyle");
exports.SliderField = (0, react_1.memo)(({ disabled, value, required, error, minValue, color = "primary", containerStyle, helperText, onChange, label, ...props }) => {
    const theme = (0, theme_1.useTheme)();
    const currentValue = value || minValue;
    const themeColor = theme.palette[error ? "error" : color] || color;
    const disabledColor = theme.palette.disabled;
    const onChangeValue = (0, react_1.useCallback)((newValue) => onChange?.(newValue), [onChange]);
    const currentColor = disabled ? disabledColor : themeColor;
    const style = (0, useThemeStyle_1.useThemeStyle)((curTheme) => [
        styles.container,
        {
            borderColor: currentColor,
            borderRadius: curTheme.borderRadius / 1.5,
        },
        containerStyle,
    ], [containerStyle, currentColor]);
    const getLabel = (0, react_1.useCallback)((curValue) => Math.floor(curValue), []);
    return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: style, children: (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: styles.flex, children: [(0, jsx_runtime_1.jsx)(TextField_1.TextFieldLabel, { required: required, isActive: true, disabled: disabled, color: color, error: error, children: label }), (0, jsx_runtime_1.jsx)(react_native_1.View, { style: styles.slider, children: (0, jsx_runtime_1.jsx)(Slider_1.Slider, { ...props, minValue: minValue, disabled: disabled, value: currentValue, getLabel: getLabel, onChange: onChangeValue }) })] }) }), (0, jsx_runtime_1.jsx)(TextField_1.TextFieldHelper, { color: color, error: error, children: helperText })] }));
});
exports.SliderField.displayName = "SliderField";
const styles = react_native_1.StyleSheet.create({
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
