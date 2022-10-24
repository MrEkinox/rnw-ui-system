"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DateField = exports.NativeDateField = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const react_native_1 = require("react-native");
const react_2 = require("react");
const TextField_1 = require("../TextField");
const Icon_1 = require("../Icon");
const moment_1 = __importDefault(require("moment"));
const Calendar_1 = require("../Calendar");
const Popover_1 = require("../Popover");
const Button_1 = require("../Button");
const utils_1 = require("../../utils");
const theme_1 = require("../../theme");
exports.NativeDateField = (0, react_1.memo)(({ children, maxDate, minDate, color = "primary", onChange, value }) => {
    const theme = (0, theme_1.useTheme)();
    const themeColor = theme.palette[color] || color;
    const valueText = (0, moment_1.default)(value).format("YYYY-MM-DD");
    const minText = minDate ? (0, moment_1.default)(minDate).format("YYYY-MM-DD") : undefined;
    const maxText = maxDate ? (0, moment_1.default)(maxDate).format("YYYY-MM-DD") : undefined;
    const onChangeValue = (0, react_1.useCallback)((event) => {
        const newValue = (0, moment_1.default)(event.target.value).toDate();
        onChange?.(newValue);
    }, [onChange]);
    if (!utils_1.isMobile)
        return (0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: children });
    return ((0, jsx_runtime_1.jsxs)("label", { htmlFor: "date-select", children: [(0, jsx_runtime_1.jsx)("input", { style: styles.native, id: "date-select", type: "date", color: themeColor, value: valueText, min: minText, max: maxText, onChange: onChangeValue }), children] }));
});
exports.DateField = (0, react_1.memo)(({ disabled, value, color, format = "DD/MM/YYYY", onChange, maxDate, minDate, ...props }) => {
    const ref = (0, react_1.useRef)(null);
    const [isOpen, setIsOpen] = (0, react_2.useState)(false);
    const [currentText, setText] = (0, react_2.useState)("");
    (0, react_1.useEffect)(() => {
        if (value)
            setText((0, moment_1.default)(value).format(format));
    }, [value, format]);
    const openPopover = (0, react_1.useCallback)(() => setIsOpen(true), []);
    const closePopover = (0, react_1.useCallback)(() => setIsOpen(false), []);
    const onChangeText = (0, react_1.useCallback)((newText) => {
        const needSlash = newText.length > currentText.length &&
            format.indexOf("/", newText.length) === newText.length;
        const newCurrentText = `${newText}${needSlash ? "/" : ""}`;
        const parsedDate = (0, moment_1.default)(newText, format);
        if (newCurrentText.length === format.length && parsedDate.isValid())
            onChange?.(parsedDate.toDate());
        else
            onChange?.(undefined);
        setText(newCurrentText);
    }, [format, currentText.length, onChange]);
    const endIcon = (0, react_1.useMemo)(() => ((0, jsx_runtime_1.jsx)(exports.NativeDateField, { value: value, color: color, onChange: onChange, minDate: minDate, maxDate: maxDate, format: format, children: (0, jsx_runtime_1.jsx)(react_native_1.View, { ref: ref, children: (0, jsx_runtime_1.jsx)(Button_1.Button, { disabled: disabled, onPress: openPopover, size: "small", children: (0, jsx_runtime_1.jsx)(Icon_1.Icon, { type: "Ionicons", name: "calendar" }) }) }) })), [value, color, onChange, minDate, maxDate, format, disabled, openPopover]);
    return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(TextField_1.TextField, { ...props, keyboardType: "number-pad", placeholder: format, onChange: onChangeText, disabled: disabled, value: currentText, maxLength: format.length, endIcon: endIcon, color: color }), !utils_1.isMobile && ((0, jsx_runtime_1.jsx)(Popover_1.Popover, { style: styles.popover, containerStyle: styles.container, parentRef: ref, open: isOpen, color: color, onClose: closePopover, children: (0, jsx_runtime_1.jsx)(Calendar_1.Calendar, { ...props, color: color, minDate: minDate, maxDate: maxDate, disabled: disabled, interactive: !disabled, onSingleChange: onChange, value: value }) }))] }));
});
exports.DateField.displayName = "DateField";
const styles = react_native_1.StyleSheet.create({
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
