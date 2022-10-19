import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { memo, useCallback } from "react";
import { StyleSheet, View } from "react-native";
import { TextFieldHelper, TextFieldLabel } from "../TextField";
import { Slider } from "../Slider";
import { useTheme } from "../../theme";
import { useThemeStyle } from "../../hooks/useThemeStyle";
export const SliderField = memo(({ disabled, value, required, error, minValue, color = "primary", containerStyle, helperText, onChange, label, ...props }) => {
    const theme = useTheme();
    const currentValue = value || minValue;
    const themeColor = theme.palette[error ? "error" : color] || color;
    const disabledColor = theme.palette.disabled;
    const onChangeValue = useCallback((newValue) => onChange?.(newValue), [onChange]);
    const currentColor = disabled ? disabledColor : themeColor;
    const style = useThemeStyle((curTheme) => [
        styles.container,
        {
            borderColor: currentColor,
            borderRadius: curTheme.borderRadius / 1.5,
        },
        containerStyle,
    ], [containerStyle, currentColor]);
    const getLabel = useCallback((curValue) => Math.floor(curValue), []);
    return (_jsxs(_Fragment, { children: [_jsx(View, { style: style, children: _jsxs(View, { style: styles.flex, children: [_jsx(TextFieldLabel, { required: required, isActive: true, disabled: disabled, color: color, error: error, children: label }), _jsx(View, { style: styles.slider, children: _jsx(Slider, { ...props, minValue: minValue, disabled: disabled, value: currentValue, getLabel: getLabel, onChange: onChangeValue }) })] }) }), _jsx(TextFieldHelper, { color: color, error: error, children: helperText })] }));
});
SliderField.displayName = "SliderField";
const styles = StyleSheet.create({
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
