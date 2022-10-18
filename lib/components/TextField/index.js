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
exports.TextField = exports.TextFieldLabel = exports.TextFieldHelper = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var react_native_1 = require("react-native");
var theme_1 = require("../../theme");
var react_2 = require("react");
var Typography_1 = require("../Typography");
var color_1 = __importDefault(require("color"));
var utils_1 = require("../../utils");
var useThemeStyle_1 = require("../../hooks/useThemeStyle");
exports.TextFieldHelper = (0, react_1.memo)(function (_a) {
    var error = _a.error, color = _a.color, children = _a.children;
    var style = (0, react_1.useMemo)(function () { return ({ padding: 5 }); }, []);
    if (typeof children !== "string")
        return null;
    return ((0, jsx_runtime_1.jsx)(Typography_1.Typography, __assign({ variant: "caption", color: error ? "error" : color, style: style }, { children: children })));
});
exports.TextFieldHelper.displayName = "TextFieldHelper";
exports.TextFieldLabel = (0, react_1.memo)(function (_a) {
    var required = _a.required, isActive = _a.isActive, height = _a.height, disabled = _a.disabled, error = _a.error, _b = _a.color, color = _b === void 0 ? "primary" : _b, children = _a.children;
    var theme = (0, theme_1.useTheme)();
    var fontFamily = theme.typography.fontFamily;
    var backgroundColor = theme.palette.background.card;
    var disabledColor = theme.palette.disabled;
    var fontColor = theme.palette.text;
    var animation = (0, react_1.useRef)(new react_native_1.Animated.Value(isActive ? 1 : 0)).current;
    var themeColor = theme.palette[error ? "error" : color] || color;
    var currentColor = disabled
        ? disabledColor
        : animation.interpolate({
            inputRange: [0, 1],
            outputRange: [(0, color_1.default)(fontColor).fade(0.7).toString(), themeColor],
        });
    var fontSize = animation.interpolate({
        inputRange: [0, 1],
        outputRange: [15, 12],
    });
    var labelPosition = animation.interpolate({
        inputRange: [0, 1],
        outputRange: [0, -(height || 20)],
    });
    (0, react_1.useEffect)(function () {
        react_native_1.Animated.timing(animation, {
            toValue: isActive ? 1 : 0,
            duration: 150,
            useNativeDriver: false,
        }).start();
    }, [animation, isActive]);
    var style = (0, react_1.useMemo)(function () { return ({
        fontFamily: fontFamily,
        position: "absolute",
        backgroundColor: backgroundColor,
        color: currentColor,
        padding: 5,
        marginLeft: -5,
        zIndex: -1,
        fontSize: fontSize,
        fontWeight: "600",
        marginTop: labelPosition,
    }); }, [backgroundColor, currentColor, fontFamily, fontSize, labelPosition]);
    if (typeof children !== "string")
        return null;
    return ((0, jsx_runtime_1.jsx)(react_native_1.Animated.Text, __assign({ style: style, numberOfLines: 1 }, { children: required ? "".concat(children, "*") : children })));
});
exports.TextFieldLabel.displayName = "TextFieldLabel";
exports.TextField = (0, react_1.memo)(function (_a) {
    var _b = _a.value, value = _b === void 0 ? "" : _b, disabled = _a.disabled, onChange = _a.onChange, label = _a.label, _c = _a.editable, editable = _c === void 0 ? true : _c, startIcon = _a.startIcon, endIcon = _a.endIcon, required = _a.required, error = _a.error, onBlur = _a.onBlur, onFocus = _a.onFocus, helperText = _a.helperText, containerStyle = _a.containerStyle, autoGrow = _a.autoGrow, _d = _a.color, color = _d === void 0 ? "primary" : _d, name = _a.name, keyboardType = _a.keyboardType, props = __rest(_a, ["value", "disabled", "onChange", "label", "editable", "startIcon", "endIcon", "required", "error", "onBlur", "onFocus", "helperText", "containerStyle", "autoGrow", "color", "name", "keyboardType"]);
    var theme = (0, theme_1.useTheme)();
    var inputRef = (0, react_1.useRef)(null);
    var _e = (0, react_2.useState)(false), isFocused = _e[0], setIsFocused = _e[1];
    var _f = (0, react_2.useState)("auto"), height = _f[0], setHeight = _f[1];
    var labelIsActive = !!value || isFocused || !!props.placeholder;
    var canEdit = editable && disabled !== true;
    var fontColor = theme.palette.text;
    var disabledColor = theme.palette.disabled;
    var themeColor = theme.palette[error ? "error" : color] || color;
    var currentColor = disabled ? disabledColor : themeColor;
    var onChangeValue = (0, react_1.useCallback)(function (newValue) {
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
    var memoStartIcon = (0, react_1.useMemo)(function () { return (0, utils_1.renderIcon)(startIcon, { color: currentColor }); }, [currentColor, startIcon]);
    var memoEndIcon = (0, react_1.useMemo)(function () { return (0, utils_1.renderIcon)(endIcon, { color: currentColor }); }, [currentColor, endIcon]);
    var onMemoBlur = (0, react_1.useCallback)(function (e) {
        if (canEdit)
            setIsFocused(false);
        onBlur === null || onBlur === void 0 ? void 0 : onBlur(e);
    }, [canEdit, onBlur]);
    var onMemoFocus = (0, react_1.useCallback)(function (e) {
        if (canEdit)
            setIsFocused(true);
        onFocus === null || onFocus === void 0 ? void 0 : onFocus(e);
    }, [canEdit, onFocus]);
    var style = (0, useThemeStyle_1.useThemeStyle)(function (curTheme) { return [
        styles.container,
        {
            borderRadius: curTheme.borderRadius / 1.5,
            borderColor: currentColor,
        },
        containerStyle,
    ]; }, [containerStyle, currentColor]);
    var inputStyle = (0, react_1.useMemo)(function () { return [
        { color: disabled ? disabledColor : fontColor, paddingVertical: 5 },
        { height: autoGrow ? height : "100%" },
        props.style,
    ]; }, [autoGrow, disabled, disabledColor, fontColor, height, props.style]);
    var flexStyle = (0, react_1.useMemo)(function () { return [styles.flex, { paddingHorizontal: 10 / 2 + 5 }]; }, []);
    var onContentSizeChange = (0, react_1.useCallback)(function (e) {
        if (autoGrow)
            setHeight(e.nativeEvent.contentSize.height);
    }, [autoGrow]);
    var placeholderTextColor = (0, color_1.default)(fontColor).fade(0.7).toString();
    return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, __assign({ style: style }, { children: [memoStartIcon, (0, jsx_runtime_1.jsxs)(react_native_1.View, __assign({ style: flexStyle }, { children: [(0, jsx_runtime_1.jsx)(exports.TextFieldLabel, __assign({ required: required, isActive: labelIsActive, disabled: disabled, color: color, error: error }, { children: label })), (0, jsx_runtime_1.jsx)(react_native_1.TextInput, __assign({ ref: inputRef, accessibilityLabel: label, nativeID: name }, props, { keyboardType: keyboardType, onChangeText: onChangeValue, onBlur: onMemoBlur, onFocus: onMemoFocus, style: inputStyle, onContentSizeChange: onContentSizeChange, placeholderTextColor: placeholderTextColor, value: value, editable: canEdit, selectionColor: themeColor }))] })), memoEndIcon] })), (0, jsx_runtime_1.jsx)(exports.TextFieldHelper, __assign({ color: color, error: error }, { children: helperText }))] }));
});
exports.TextField.displayName = "TextField";
var styles = react_native_1.StyleSheet.create({
    flex: { flex: 1, height: "100%", alignSelf: "flex-start" },
    container: {
        borderWidth: 2,
        padding: 5,
        minHeight: 44,
        alignItems: "center",
        flexDirection: "row",
    },
});
