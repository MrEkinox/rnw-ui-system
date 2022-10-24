"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TextField = exports.TextFieldLabel = exports.TextFieldHelper = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const react_native_1 = require("react-native");
const theme_1 = require("../../theme");
const react_2 = require("react");
const Typography_1 = require("../Typography");
const color_1 = __importDefault(require("color"));
const utils_1 = require("../../utils");
const useThemeStyle_1 = require("../../hooks/useThemeStyle");
exports.TextFieldHelper = (0, react_1.memo)(({ error, color, children }) => {
    const style = (0, react_1.useMemo)(() => ({ padding: 5 }), []);
    if (typeof children !== "string")
        return null;
    return ((0, jsx_runtime_1.jsx)(Typography_1.Typography, { variant: "caption", color: error ? "error" : color, style: style, children: children }));
});
exports.TextFieldHelper.displayName = "TextFieldHelper";
exports.TextFieldLabel = (0, react_1.memo)(({ required, isActive, height, disabled, error, color = "primary", children, }) => {
    const theme = (0, theme_1.useTheme)();
    const fontFamily = theme.typography.fontFamily;
    const backgroundColor = theme.palette.background.card;
    const disabledColor = theme.palette.disabled;
    const fontColor = theme.palette.text;
    const animation = (0, react_1.useRef)(new react_native_1.Animated.Value(isActive ? 1 : 0)).current;
    const themeColor = theme.palette[error ? "error" : color] || color;
    const currentColor = disabled
        ? disabledColor
        : animation.interpolate({
            inputRange: [0, 1],
            outputRange: [(0, color_1.default)(fontColor).fade(0.7).toString(), themeColor],
        });
    const fontSize = animation.interpolate({
        inputRange: [0, 1],
        outputRange: [15, 12],
    });
    const labelPosition = animation.interpolate({
        inputRange: [0, 1],
        outputRange: [0, -(height || 20)],
    });
    (0, react_1.useEffect)(() => {
        react_native_1.Animated.timing(animation, {
            toValue: isActive ? 1 : 0,
            duration: 150,
            useNativeDriver: false,
        }).start();
    }, [animation, isActive]);
    const style = (0, react_1.useMemo)(() => ({
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
    return ((0, jsx_runtime_1.jsx)(react_native_1.Animated.Text, { style: style, numberOfLines: 1, children: required ? `${children}*` : children }));
});
exports.TextFieldLabel.displayName = "TextFieldLabel";
exports.TextField = (0, react_1.memo)(({ value = "", disabled, onChange, label, editable = true, startIcon, endIcon, required, error, onBlur, onFocus, helperText, containerStyle, autoGrow, color = "primary", name, keyboardType, ...props }) => {
    const theme = (0, theme_1.useTheme)();
    const inputRef = (0, react_1.useRef)(null);
    const [isFocused, setIsFocused] = (0, react_2.useState)(false);
    const [height, setHeight] = (0, react_2.useState)("auto");
    const labelIsActive = !!value || isFocused || !!props.placeholder;
    const canEdit = editable && disabled !== true;
    const fontColor = theme.palette.text;
    const disabledColor = theme.palette.disabled;
    const themeColor = theme.palette[error ? "error" : color] || color;
    const currentColor = disabled ? disabledColor : themeColor;
    const onChangeValue = (0, react_1.useCallback)((newValue) => {
        if (newValue.length) {
            if (keyboardType === "numeric" && !newValue.match(/^\d+$/))
                return;
            if (keyboardType === "phone-pad" && !newValue.match(/^[+ \d]+$/))
                return;
        }
        onChange?.(newValue);
        if (!newValue)
            setHeight("auto");
    }, [onChange, keyboardType]);
    const memoStartIcon = (0, react_1.useMemo)(() => (0, utils_1.renderIcon)(startIcon, { color: currentColor }), [currentColor, startIcon]);
    const memoEndIcon = (0, react_1.useMemo)(() => (0, utils_1.renderIcon)(endIcon, { color: currentColor }), [currentColor, endIcon]);
    const onMemoBlur = (0, react_1.useCallback)((e) => {
        if (canEdit)
            setIsFocused(false);
        onBlur?.(e);
    }, [canEdit, onBlur]);
    const onMemoFocus = (0, react_1.useCallback)((e) => {
        if (canEdit)
            setIsFocused(true);
        onFocus?.(e);
    }, [canEdit, onFocus]);
    const style = (0, useThemeStyle_1.useThemeStyle)((curTheme) => [
        styles.container,
        {
            borderRadius: curTheme.borderRadius / 1.5,
            borderColor: currentColor,
        },
        containerStyle,
    ], [containerStyle, currentColor]);
    const inputStyle = (0, react_1.useMemo)(() => [
        { color: disabled ? disabledColor : fontColor, paddingVertical: 5 },
        { height: autoGrow ? height : "100%" },
        props.style,
    ], [autoGrow, disabled, disabledColor, fontColor, height, props.style]);
    const flexStyle = (0, react_1.useMemo)(() => [styles.flex, { paddingHorizontal: 10 / 2 + 5 }], []);
    const onContentSizeChange = (0, react_1.useCallback)((e) => {
        if (autoGrow)
            setHeight(e.nativeEvent.contentSize.height);
    }, [autoGrow]);
    const placeholderTextColor = (0, color_1.default)(fontColor).fade(0.7).toString();
    return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: style, children: [memoStartIcon, (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: flexStyle, children: [(0, jsx_runtime_1.jsx)(exports.TextFieldLabel, { required: required, isActive: labelIsActive, disabled: disabled, color: color, error: error, children: label }), (0, jsx_runtime_1.jsx)(react_native_1.TextInput, { ref: inputRef, accessibilityLabel: label, nativeID: name, ...props, keyboardType: keyboardType, onChangeText: onChangeValue, onBlur: onMemoBlur, onFocus: onMemoFocus, style: inputStyle, onContentSizeChange: onContentSizeChange, placeholderTextColor: placeholderTextColor, value: value, editable: canEdit, selectionColor: themeColor })] }), memoEndIcon] }), (0, jsx_runtime_1.jsx)(exports.TextFieldHelper, { color: color, error: error, children: helperText })] }));
});
exports.TextField.displayName = "TextField";
const styles = react_native_1.StyleSheet.create({
    flex: { flex: 1, height: "100%", alignSelf: "flex-start" },
    container: {
        borderWidth: 2,
        padding: 5,
        minHeight: 44,
        alignItems: "center",
        flexDirection: "row",
    },
});
