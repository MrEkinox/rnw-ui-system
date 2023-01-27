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
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { memo, useCallback, useEffect, useMemo, useState } from "react";
import { StyleSheet, TextInput, View } from "react-native";
import { TextFieldHelper, TextFieldLabel } from "../TextField";
import { Slider } from "../Slider";
import { useTheme } from "../../theme";
import { useThemeStyle } from "../../hooks/useThemeStyle";
export const SliderField = memo((_a) => {
    var { disabled, value, required, error, minValue, maxValue, color = "primary", containerStyle, helperText, onChange, label } = _a, props = __rest(_a, ["disabled", "value", "required", "error", "minValue", "maxValue", "color", "containerStyle", "helperText", "onChange", "label"]);
    const theme = useTheme();
    const currentValue = value || minValue;
    const fontColor = theme.palette.text;
    const themeColor = theme.palette[error ? "error" : color] || color;
    const disabledColor = theme.palette.disabled;
    const [currentText, setCurrentText] = useState((value === null || value === void 0 ? void 0 : value.toString()) || minValue.toString());
    const onChangeValue = useCallback((newValue) => onChange === null || onChange === void 0 ? void 0 : onChange(newValue), [onChange]);
    useEffect(() => {
        setCurrentText((value === null || value === void 0 ? void 0 : value.toString()) || minValue.toString());
    }, [minValue, value]);
    const onChangeTextValue = useCallback((newValue) => {
        if (!newValue)
            setCurrentText(newValue);
        const newIntValue = parseFloat(newValue);
        if (newIntValue <= maxValue && newIntValue >= minValue) {
            onChange === null || onChange === void 0 ? void 0 : onChange(newIntValue);
        }
    }, [maxValue, minValue, onChange]);
    const currentColor = disabled ? disabledColor : themeColor;
    const style = useThemeStyle((curTheme) => [
        styles.container,
        {
            borderColor: currentColor,
            borderRadius: curTheme.borderRadius / 1.5,
        },
        containerStyle,
    ], [containerStyle, currentColor]);
    const inputStyle = useMemo(() => [
        {
            color: disabled ? disabledColor : fontColor,
            paddingVertical: 5,
            width: 25,
        },
        props.style,
    ], [disabled, disabledColor, fontColor, props.style]);
    return (_jsxs(_Fragment, { children: [_jsx(View, Object.assign({ style: style }, { children: _jsxs(View, Object.assign({ style: styles.flex }, { children: [_jsx(TextFieldLabel, Object.assign({ required: required, isActive: true, disabled: disabled, color: color, error: error }, { children: label })), _jsxs(View, Object.assign({ style: styles.content }, { children: [_jsx(TextInput, { editable: !disabled, value: currentText, keyboardType: "numeric", onChangeText: onChangeTextValue, style: inputStyle }), _jsx(Slider, Object.assign({}, props, { style: styles.slider, maxValue: maxValue, minValue: minValue, disabled: disabled, value: currentValue, onChange: onChangeValue }))] }))] })) })), _jsx(TextFieldHelper, Object.assign({ color: color, error: error }, { children: helperText }))] }));
});
SliderField.displayName = "SliderField";
const styles = StyleSheet.create({
    content: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
    },
    slider: {
        flex: 1,
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
