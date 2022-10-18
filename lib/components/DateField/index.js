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
exports.DateField = exports.NativeDateField = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var react_native_1 = require("react-native");
var react_2 = require("react");
var TextField_1 = require("../TextField");
var Icon_1 = require("../Icon");
var moment_1 = __importDefault(require("moment"));
var Calendar_1 = require("../Calendar");
var Popover_1 = require("../Popover");
var Button_1 = require("../Button");
var utils_1 = require("../../utils");
var theme_1 = require("../../theme");
exports.NativeDateField = (0, react_1.memo)(function (_a) {
    var children = _a.children, maxDate = _a.maxDate, minDate = _a.minDate, _b = _a.color, color = _b === void 0 ? "primary" : _b, onChange = _a.onChange, value = _a.value;
    var theme = (0, theme_1.useTheme)();
    var themeColor = theme.palette[color] || color;
    var valueText = (0, moment_1.default)(value).format("YYYY-MM-DD");
    var minText = minDate ? (0, moment_1.default)(minDate).format("YYYY-MM-DD") : undefined;
    var maxText = maxDate ? (0, moment_1.default)(maxDate).format("YYYY-MM-DD") : undefined;
    var onChangeValue = (0, react_1.useCallback)(function (event) {
        var newValue = (0, moment_1.default)(event.target.value).toDate();
        onChange === null || onChange === void 0 ? void 0 : onChange(newValue);
    }, [onChange]);
    if (!utils_1.isMobile)
        return (0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: children });
    return ((0, jsx_runtime_1.jsxs)("label", __assign({ htmlFor: "date-select" }, { children: [(0, jsx_runtime_1.jsx)("input", { style: styles.native, id: "date-select", type: "date", color: themeColor, value: valueText, min: minText, max: maxText, onChange: onChangeValue }), children] })));
});
exports.DateField = (0, react_1.memo)(function (_a) {
    var disabled = _a.disabled, value = _a.value, color = _a.color, _b = _a.format, format = _b === void 0 ? "DD/MM/YYYY" : _b, onChange = _a.onChange, maxDate = _a.maxDate, minDate = _a.minDate, props = __rest(_a, ["disabled", "value", "color", "format", "onChange", "maxDate", "minDate"]);
    var ref = (0, react_1.useRef)(null);
    var _c = (0, react_2.useState)(false), isOpen = _c[0], setIsOpen = _c[1];
    var _d = (0, react_2.useState)(""), currentText = _d[0], setText = _d[1];
    (0, react_1.useEffect)(function () {
        if (value)
            setText((0, moment_1.default)(value).format(format));
    }, [value, format]);
    var openPopover = (0, react_1.useCallback)(function () { return setIsOpen(true); }, []);
    var closePopover = (0, react_1.useCallback)(function () { return setIsOpen(false); }, []);
    var onChangeText = (0, react_1.useCallback)(function (newText) {
        var needSlash = newText.length > currentText.length &&
            format.indexOf("/", newText.length) === newText.length;
        var newCurrentText = "".concat(newText).concat(needSlash ? "/" : "");
        var parsedDate = (0, moment_1.default)(newText, format);
        if (newCurrentText.length === format.length && parsedDate.isValid())
            onChange === null || onChange === void 0 ? void 0 : onChange(parsedDate.toDate());
        else
            onChange === null || onChange === void 0 ? void 0 : onChange(undefined);
        setText(newCurrentText);
    }, [format, currentText.length, onChange]);
    var endIcon = (0, react_1.useMemo)(function () { return ((0, jsx_runtime_1.jsx)(exports.NativeDateField, __assign({ value: value, color: color, onChange: onChange, minDate: minDate, maxDate: maxDate, format: format }, { children: (0, jsx_runtime_1.jsx)(react_native_1.View, __assign({ ref: ref }, { children: (0, jsx_runtime_1.jsx)(Button_1.Button, __assign({ disabled: disabled, onPress: openPopover, size: "small" }, { children: (0, jsx_runtime_1.jsx)(Icon_1.Icon, { type: "Ionicons", name: "calendar" }) })) })) }))); }, [value, color, onChange, minDate, maxDate, format, disabled, openPopover]);
    return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(TextField_1.TextField, __assign({}, props, { keyboardType: "number-pad", placeholder: format, onChange: onChangeText, disabled: disabled, value: currentText, maxLength: format.length, endIcon: endIcon, color: color })), !utils_1.isMobile && ((0, jsx_runtime_1.jsx)(Popover_1.Popover, __assign({ style: styles.popover, containerStyle: styles.container, parentRef: ref, open: isOpen, color: color, onClose: closePopover }, { children: (0, jsx_runtime_1.jsx)(Calendar_1.Calendar, __assign({}, props, { color: color, minDate: minDate, maxDate: maxDate, disabled: disabled, interactive: !disabled, onSingleChange: onChange, value: value })) })))] }));
});
exports.DateField.displayName = "DateField";
var styles = react_native_1.StyleSheet.create({
    container: { padding: 5 },
    popover: { maxWidth: 300 },
    native: {
        top: 0,
        left: 0,
        height: "100%",
        width: "100%",
        position: "absolute",
        opacity: 0,
    },
});
