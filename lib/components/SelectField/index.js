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
import { memo, useCallback, useId, useMemo, useRef } from "react";
import { FlatList, Pressable, StyleSheet, TextInput, } from "react-native";
import { useState } from "react";
import { TextField } from "../TextField";
import { Icon } from "../Icon";
import { Popover } from "../Popover";
import { SelectFieldItem } from "./SelectFieldItem";
import { isMobile } from "../../utils";
import { useTheme } from "../../theme";
import { Typography } from "../Typography";
import { Checkbox } from "../Checkbox";
const getSelectedOptions = (selectedOptions) => {
    return Array.from({ length: selectedOptions.length }).map((_, index) => { var _a; return (_a = selectedOptions.item(index)) === null || _a === void 0 ? void 0 : _a.value; });
};
export const NativeSelectField = memo(({ children, items, value, onChange, color = "primary", disabled, multiple, }) => {
    const theme = useTheme();
    const themeColor = theme.palette[color] || color;
    const id = useId();
    const onChangeValue = useCallback((event) => {
        const newValue = multiple
            ? getSelectedOptions(event.target.selectedOptions)
            : event.target.value;
        onChange === null || onChange === void 0 ? void 0 : onChange(newValue);
    }, [multiple, onChange]);
    if (!isMobile)
        return _jsx(_Fragment, { children: children });
    return (_jsxs("label", Object.assign({ htmlFor: `select-${id}`, style: styles.nativeLabel }, { children: [_jsx("select", Object.assign({ disabled: disabled, id: `select-${id}`, value: value || "default", color: themeColor, onChange: onChangeValue, multiple: multiple, style: styles.native }, { children: items === null || items === void 0 ? void 0 : items.map((item, index) => (_jsx("option", Object.assign({ disabled: item.disabled, id: item.nativeID, value: item.value }, { children: item.label }), index))) })), children] })));
});
const stickyHeaderIndices = [0];
export const SelectField = memo((_a) => {
    var { value, disabled, label, items, multiple, searchable, onChange, renderItem, color = "primary", flatListProps, clearText, clearable, children, style, onTouchStart, onTouchEnd, onHoverIn, onHoverOut } = _a, props = __rest(_a, ["value", "disabled", "label", "items", "multiple", "searchable", "onChange", "renderItem", "color", "flatListProps", "clearText", "clearable", "children", "style", "onTouchStart", "onTouchEnd", "onHoverIn", "onHoverOut"]);
    const theme = useTheme();
    const [searchText, setSearchText] = useState("");
    const ref = useRef(null);
    const [isOpen, setIsOpen] = useState(false);
    const emptyText = theme.intl.selectField.empty;
    const disabledColor = theme.palette.disabled;
    const themeColor = theme.palette[color] || color;
    const fontFamily = theme.typography.fontFamily;
    const backgroundColor = theme.palette.background.card;
    const fontColor = theme.palette.text;
    const currentItems = useMemo(() => {
        let newItems = items;
        if (clearable && clearText && !isMobile) {
            newItems = [{ label: clearText || "", value: "clear" }, ...newItems];
        }
        if (isMobile && !multiple) {
            newItems = [
                { label: label || "", value: "default", disabled: true },
                ...newItems,
            ];
        }
        return newItems;
    }, [items, clearable, clearText, multiple, label]);
    const currentText = useMemo(() => currentItems
        .filter((item) => {
        if (typeof value === "string")
            return item.value === value;
        return value === null || value === void 0 ? void 0 : value.includes(item.value);
    })
        .map((item) => item.label)
        .join(", ") || "", [value, currentItems]);
    const onChangeValue = useCallback((newValue) => {
        let newCurrentValue = newValue;
        if (newValue === value || newValue === "clear")
            newCurrentValue = undefined;
        if (multiple && value instanceof Array) {
            if (value === null || value === void 0 ? void 0 : value.includes(newValue)) {
                newCurrentValue = value.filter((cValue) => cValue !== newValue);
            }
            else if (newValue === "clear") {
                newCurrentValue = [];
            }
            else
                newCurrentValue = [...value, newValue];
        }
        if (!multiple)
            setIsOpen(false);
        onChange === null || onChange === void 0 ? void 0 : onChange(newCurrentValue);
    }, [value, multiple, onChange]);
    const getIsSelected = useCallback((curValue) => {
        if (!value)
            return false;
        if (typeof value === "string")
            return value === curValue;
        return (value === null || value === void 0 ? void 0 : value.findIndex((cValue) => cValue === curValue)) !== -1;
    }, [value]);
    const openPopover = useCallback(() => setIsOpen(true), []);
    const closePopover = useCallback(() => setIsOpen(false), []);
    const renderOption = useCallback(({ item, index }) => {
        const isSelected = getIsSelected(item.value);
        return (_jsx(SelectFieldItem, Object.assign({ selected: isSelected, color: color, nativeID: item.nativeID, disabled: item.disabled, value: item.value, onPress: onChangeValue }, { children: (renderItem === null || renderItem === void 0 ? void 0 : renderItem(item, isSelected)) || multiple ? (_jsx(Checkbox, { disabled: item.disabled, value: isSelected, label: item.label, pointerEvents: "none" })) : (item.label) }), index));
    }, [color, getIsSelected, multiple, onChangeValue, renderItem]);
    const endIcon = useMemo(() => _jsx(Icon, { type: "Octicons", name: "chevron-down", style: styles.icon }), []);
    const inputStyle = useMemo(() => ({
        color: fontColor,
        fontFamily,
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderBottomWidth: 1,
        borderBottomColor: themeColor,
        backgroundColor,
    }), [themeColor, backgroundColor, fontColor, fontFamily]);
    const searchInput = useMemo(() => {
        if (!searchable)
            return null;
        return (_jsx(TextInput, { autoFocus: true, onChangeText: setSearchText, style: inputStyle, nativeID: "searchCountryInput", value: searchText, placeholderTextColor: disabledColor, selectionColor: themeColor, placeholder: "Rechercher" }));
    }, [searchable, disabledColor, inputStyle, searchText, themeColor]);
    const filteredItems = useMemo(() => currentItems === null || currentItems === void 0 ? void 0 : currentItems.filter(({ label: label2 }) => label2.toLowerCase().includes(searchText.toLowerCase())), [currentItems, searchText]);
    const emptyList = useMemo(() => (_jsx(Typography, Object.assign({ variant: "body2", style: styles.empty }, { children: emptyText }))), [emptyText]);
    return (_jsx(NativeSelectField, Object.assign({ value: value, items: currentItems, color: color, disabled: disabled, onChange: onChange, multiple: multiple }, { children: _jsxs(Pressable, Object.assign({ disabled: disabled || isMobile, ref: ref, style: style, onPress: openPopover, onTouchStart: onTouchStart, onTouchEnd: onTouchEnd, onHoverIn: onHoverIn, onHoverOut: onHoverOut }, { children: [children || (_jsx(TextField, Object.assign({ endIcon: endIcon }, props, { label: label, disabled: disabled, color: color, value: currentText, editable: false }))), !isMobile && (_jsx(Popover, Object.assign({ parentRef: ref, open: isOpen, onClose: closePopover }, { children: _jsx(FlatList, Object.assign({ data: filteredItems, ListHeaderComponent: searchInput, stickyHeaderIndices: searchable ? stickyHeaderIndices : undefined, removeClippedSubviews: true, ListEmptyComponent: emptyList, renderItem: renderOption, style: styles.list }, flatListProps)) })))] })) })));
});
SelectField.displayName = "SelectField";
const styles = StyleSheet.create({
    list: { maxHeight: 200, maxWidth: 300, overflow: "scroll" },
    icon: {
        marginRight: 5,
        zIndex: +1,
    },
    empty: {
        padding: 15,
    },
    nativeLabel: {
        position: "relative",
    },
    native: {
        position: "absolute",
        top: 0,
        left: 0,
        height: "100%",
        width: "100%",
        opacity: 0,
    },
});
