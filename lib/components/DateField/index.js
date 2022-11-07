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
import { Fragment as _Fragment, jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { memo, useCallback, useEffect, useMemo, useRef } from "react";
import { StyleSheet, View } from "react-native";
import { useState } from "react";
import { TextField } from "../TextField";
import { Icon } from "../Icon";
import dayjs from "dayjs";
import { Calendar } from "../Calendar";
import { Popover } from "../Popover";
import { Button } from "../Button";
import { isMobile } from "../../utils";
import { useTheme } from "../../theme";
export const NativeDateField = memo(({ children, maxDate, minDate, color = "primary", onChange, value }) => {
    const theme = useTheme();
    const themeColor = theme.palette[color] || color;
    const valueText = dayjs(value).format("YYYY-MM-DD");
    const minText = minDate ? dayjs(minDate).format("YYYY-MM-DD") : undefined;
    const maxText = maxDate ? dayjs(maxDate).format("YYYY-MM-DD") : undefined;
    const onChangeValue = useCallback((event) => {
        const newValue = dayjs(event.target.value).toDate();
        onChange === null || onChange === void 0 ? void 0 : onChange(newValue);
    }, [onChange]);
    if (!isMobile)
        return _jsx(_Fragment, { children: children });
    return (_jsxs("label", Object.assign({ htmlFor: "date-select" }, { children: [_jsx("input", { style: styles.native, id: "date-select", type: "date", color: themeColor, value: valueText, min: minText, max: maxText, onChange: onChangeValue }), children] })));
});
export const DateField = memo((_a) => {
    var { disabled, value, color, format = "DD/MM/YYYY", onChange, maxDate, minDate } = _a, props = __rest(_a, ["disabled", "value", "color", "format", "onChange", "maxDate", "minDate"]);
    const ref = useRef(null);
    const [isOpen, setIsOpen] = useState(false);
    const [currentText, setText] = useState("");
    useEffect(() => {
        if (value)
            setText(dayjs(value).format(format));
    }, [value, format]);
    const openPopover = useCallback(() => setIsOpen(true), []);
    const closePopover = useCallback(() => setIsOpen(false), []);
    const onChangeText = useCallback((newText) => {
        const needSlash = newText.length > currentText.length &&
            format.indexOf("/", newText.length) === newText.length;
        const newCurrentText = `${newText}${needSlash ? "/" : ""}`;
        const parsedDate = dayjs(newText, format);
        if (newCurrentText.length === format.length && parsedDate.isValid())
            onChange === null || onChange === void 0 ? void 0 : onChange(parsedDate.toDate());
        else
            onChange === null || onChange === void 0 ? void 0 : onChange(undefined);
        setText(newCurrentText);
    }, [format, currentText.length, onChange]);
    const endIcon = useMemo(() => (_jsx(NativeDateField, Object.assign({ value: value, color: color, onChange: onChange, minDate: minDate, maxDate: maxDate, format: format }, { children: _jsx(View, Object.assign({ ref: ref }, { children: _jsx(Button, Object.assign({ disabled: disabled, onPress: openPopover, size: "small" }, { children: _jsx(Icon, { type: "Ionicons", name: "calendar" }) })) })) }))), [value, color, onChange, minDate, maxDate, format, disabled, openPopover]);
    return (_jsxs(_Fragment, { children: [_jsx(TextField, Object.assign({}, props, { keyboardType: "number-pad", placeholder: format, onChange: onChangeText, disabled: disabled, value: currentText, maxLength: format.length, endIcon: endIcon, color: color })), !isMobile && (_jsx(Popover, Object.assign({ style: styles.popover, containerStyle: styles.container, parentRef: ref, open: isOpen, color: color, onClose: closePopover }, { children: _jsx(Calendar, Object.assign({}, props, { color: color, minDate: minDate, maxDate: maxDate, disabled: disabled, interactive: !disabled, onSingleChange: onChange, value: value })) })))] }));
});
DateField.displayName = "DateField";
const styles = StyleSheet.create({
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
