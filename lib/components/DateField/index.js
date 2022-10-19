import { Fragment as _Fragment, jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { memo, useCallback, useEffect, useMemo, useRef } from "react";
import { StyleSheet, View } from "react-native";
import { useState } from "react";
import { TextField } from "../TextField";
import { Icon } from "../Icon";
import moment from "moment";
import { Calendar } from "../Calendar";
import { Popover } from "../Popover";
import { Button } from "../Button";
import { isMobile } from "../../utils";
import { useTheme } from "../../theme";
export const NativeDateField = memo(({ children, maxDate, minDate, color = "primary", onChange, value }) => {
    const theme = useTheme();
    const themeColor = theme.palette[color] || color;
    const valueText = moment(value).format("YYYY-MM-DD");
    const minText = minDate ? moment(minDate).format("YYYY-MM-DD") : undefined;
    const maxText = maxDate ? moment(maxDate).format("YYYY-MM-DD") : undefined;
    const onChangeValue = useCallback((event) => {
        const newValue = moment(event.target.value).toDate();
        onChange?.(newValue);
    }, [onChange]);
    if (!isMobile)
        return _jsx(_Fragment, { children: children });
    return (_jsxs("label", { htmlFor: "date-select", children: [_jsx("input", { style: styles.native, id: "date-select", type: "date", color: themeColor, value: valueText, min: minText, max: maxText, onChange: onChangeValue }), children] }));
});
export const DateField = memo(({ disabled, value, color, format = "DD/MM/YYYY", onChange, maxDate, minDate, ...props }) => {
    const ref = useRef(null);
    const [isOpen, setIsOpen] = useState(false);
    const [currentText, setText] = useState("");
    useEffect(() => {
        if (value)
            setText(moment(value).format(format));
    }, [value, format]);
    const openPopover = useCallback(() => setIsOpen(true), []);
    const closePopover = useCallback(() => setIsOpen(false), []);
    const onChangeText = useCallback((newText) => {
        const needSlash = newText.length > currentText.length &&
            format.indexOf("/", newText.length) === newText.length;
        const newCurrentText = `${newText}${needSlash ? "/" : ""}`;
        const parsedDate = moment(newText, format);
        if (newCurrentText.length === format.length && parsedDate.isValid())
            onChange?.(parsedDate.toDate());
        else
            onChange?.(undefined);
        setText(newCurrentText);
    }, [format, currentText.length, onChange]);
    const endIcon = useMemo(() => (_jsx(NativeDateField, { value: value, color: color, onChange: onChange, minDate: minDate, maxDate: maxDate, format: format, children: _jsx(View, { ref: ref, children: _jsx(Button, { disabled: disabled, onPress: openPopover, size: "small", children: _jsx(Icon, { type: "Ionicons", name: "calendar" }) }) }) })), [value, color, onChange, minDate, maxDate, format, disabled, openPopover]);
    return (_jsxs(_Fragment, { children: [_jsx(TextField, { ...props, keyboardType: "number-pad", placeholder: format, onChange: onChangeText, disabled: disabled, value: currentText, maxLength: format.length, endIcon: endIcon, color: color }), !isMobile && (_jsx(Popover, { style: styles.popover, containerStyle: styles.container, parentRef: ref, open: isOpen, color: color, onClose: closePopover, children: _jsx(Calendar, { ...props, color: color, minDate: minDate, maxDate: maxDate, disabled: disabled, interactive: !disabled, onSingleChange: onChange, value: value }) }))] }));
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
