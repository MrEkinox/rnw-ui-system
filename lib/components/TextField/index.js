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
import { memo, useCallback, useEffect, useMemo, useRef } from "react";
import { Animated, StyleSheet, TextInput, View, } from "react-native";
import { useTheme } from "../../theme";
import { useState } from "react";
import { Typography } from "../Typography";
import ColorJS from "color";
import { renderIcon } from "../../utils";
import { useThemeStyle } from "../../hooks/useThemeStyle";
export const TextFieldHelper = memo(({ error, color, children }) => {
    const style = useMemo(() => ({ padding: 5 }), []);
    if (typeof children !== "string")
        return null;
    return (_jsx(Typography, Object.assign({ variant: "caption", color: error ? "error" : color, style: style }, { children: children })));
});
TextFieldHelper.displayName = "TextFieldHelper";
export const TextFieldLabel = memo(({ required, isActive, height, disabled, error, color = "primary", children, }) => {
    const theme = useTheme();
    const fontFamily = theme.typography.fontFamily;
    const backgroundColor = theme.palette.background.card;
    const disabledColor = theme.palette.disabled;
    const fontColor = theme.palette.text;
    const animation = useRef(new Animated.Value(isActive ? 1 : 0)).current;
    const themeColor = theme.palette[error ? "error" : color] || color;
    const currentColor = disabled
        ? disabledColor
        : animation.interpolate({
            inputRange: [0, 1],
            outputRange: [ColorJS(fontColor).fade(0.7).toString(), themeColor],
        });
    const fontSize = animation.interpolate({
        inputRange: [0, 1],
        outputRange: [15, 12],
    });
    const labelPosition = animation.interpolate({
        inputRange: [0, 1],
        outputRange: [0, -(height || 20)],
    });
    useEffect(() => {
        Animated.timing(animation, {
            toValue: isActive ? 1 : 0,
            duration: 150,
            useNativeDriver: false,
        }).start();
    }, [animation, isActive]);
    const style = useMemo(() => ({
        fontFamily,
        position: "absolute",
        backgroundColor: backgroundColor,
        color: currentColor,
        padding: 5,
        marginLeft: -5,
        zIndex: -1,
        fontSize,
        fontWeight: "600",
        marginTop: labelPosition,
    }), [backgroundColor, currentColor, fontFamily, fontSize, labelPosition]);
    if (typeof children !== "string")
        return null;
    return (_jsx(Animated.Text, Object.assign({ style: style, numberOfLines: 1 }, { children: required ? `${children}*` : children })));
});
TextFieldLabel.displayName = "TextFieldLabel";
export const TextField = memo((_a) => {
    var { value = "", disabled, onChange, label, editable = true, startIcon, endIcon, required, error, onBlur, onFocus, helperText, containerStyle, autoGrow, color = "primary", name, keyboardType } = _a, props = __rest(_a, ["value", "disabled", "onChange", "label", "editable", "startIcon", "endIcon", "required", "error", "onBlur", "onFocus", "helperText", "containerStyle", "autoGrow", "color", "name", "keyboardType"]);
    const theme = useTheme();
    const inputRef = useRef(null);
    const [isFocused, setIsFocused] = useState(false);
    const [height, setHeight] = useState("auto");
    const labelIsActive = !!value || isFocused || !!props.placeholder;
    const canEdit = editable && disabled !== true;
    const fontColor = theme.palette.text;
    const disabledColor = theme.palette.disabled;
    const themeColor = theme.palette[error ? "error" : color] || color;
    const currentColor = disabled ? disabledColor : themeColor;
    const onChangeValue = useCallback((newValue) => {
        if (newValue.length) {
            if (keyboardType === "numeric" && !newValue.match(/^\d+$/))
                return;
            if (keyboardType === "phone-pad" && !newValue.match(/^[+ \d]+$/))
                return;
        }
        onChange === null || onChange === void 0 ? void 0 : onChange(newValue);
        if (!newValue)
            setHeight("auto");
    }, [onChange, keyboardType]);
    const memoStartIcon = useMemo(() => renderIcon(startIcon, { color: currentColor }), [currentColor, startIcon]);
    const memoEndIcon = useMemo(() => renderIcon(endIcon, { color: currentColor }), [currentColor, endIcon]);
    const onMemoBlur = useCallback((e) => {
        if (canEdit)
            setIsFocused(false);
        onBlur === null || onBlur === void 0 ? void 0 : onBlur(e);
    }, [canEdit, onBlur]);
    const onMemoFocus = useCallback((e) => {
        if (canEdit)
            setIsFocused(true);
        onFocus === null || onFocus === void 0 ? void 0 : onFocus(e);
    }, [canEdit, onFocus]);
    const style = useThemeStyle((curTheme) => [
        styles.container,
        {
            borderRadius: curTheme.borderRadius / 1.5,
            borderColor: currentColor,
        },
        containerStyle,
    ], [containerStyle, currentColor]);
    const inputStyle = useMemo(() => [
        { color: disabled ? disabledColor : fontColor, paddingVertical: 5 },
        { height: autoGrow ? height : "100%" },
        props.style,
    ], [autoGrow, disabled, disabledColor, fontColor, height, props.style]);
    const flexStyle = useMemo(() => [styles.flex, { paddingHorizontal: 10 / 2 + 5 }], []);
    const onContentSizeChange = useCallback((e) => {
        if (autoGrow)
            setHeight(e.nativeEvent.contentSize.height);
    }, [autoGrow]);
    const placeholderTextColor = ColorJS(fontColor).fade(0.7).toString();
    return (_jsxs(_Fragment, { children: [_jsxs(View, Object.assign({ style: style }, { children: [memoStartIcon, _jsxs(View, Object.assign({ style: flexStyle }, { children: [_jsx(TextFieldLabel, Object.assign({ required: required, isActive: labelIsActive, disabled: disabled, color: color, error: error }, { children: label })), _jsx(TextInput, Object.assign({ ref: inputRef, accessibilityLabel: label, nativeID: name }, props, { keyboardType: keyboardType, onChangeText: onChangeValue, onBlur: onMemoBlur, onFocus: onMemoFocus, style: inputStyle, onContentSizeChange: onContentSizeChange, placeholderTextColor: placeholderTextColor, value: value, editable: canEdit, selectionColor: themeColor }))] })), memoEndIcon] })), _jsx(TextFieldHelper, Object.assign({ color: color, error: error }, { children: helperText }))] }));
});
TextField.displayName = "TextField";
const styles = StyleSheet.create({
    flex: { flex: 1, height: "100%", alignSelf: "flex-start" },
    container: {
        borderWidth: 2,
        padding: 5,
        minHeight: 44,
        alignItems: "center",
        flexDirection: "row",
    },
});
