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
const getSelectedOptions = (selectedOptions) => {
    return Array.from({ length: selectedOptions.length }).map((_, index) => selectedOptions.item(index)?.value);
};
export const NativeSelectField = memo(({ children, items, value, onChange, color = "primary", disabled, multiple, }) => {
    const theme = useTheme();
    const themeColor = theme.palette[color] || color;
    const id = useId();
    const onChangeValue = useCallback((event) => {
        const newValue = multiple
            ? getSelectedOptions(event.target.selectedOptions)
            : event.target.value;
        onChange?.(newValue);
    }, [multiple, onChange]);
    if (!isMobile)
        return _jsx(_Fragment, { children: children });
    return (_jsxs("label", { htmlFor: `select-${id}`, children: [_jsx("select", { disabled: disabled, id: `select-${id}`, value: value || "default", color: themeColor, onChange: onChangeValue, multiple: multiple, style: styles.native, children: items?.map((item, index) => (_jsx("option", { disabled: item.disabled, id: item.nativeID, value: item.value, children: item.label }, index))) }), children] }));
});
const stickyHeaderIndices = [0];
export const SelectField = memo(({ value, disabled, label, items, multiple, searchable, onChange, renderItem, color = "primary", flatListProps, clearText, clearable, children, ...props }) => {
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
        return value?.includes(item.value);
    })
        .map((item) => item.label)
        .join(", ") || "", [value, currentItems]);
    const onChangeValue = useCallback((newValue) => {
        let newCurrentValue = newValue;
        if (newValue === value || newValue === "clear")
            newCurrentValue = undefined;
        if (multiple && value instanceof Array) {
            if (value?.includes(newValue)) {
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
        onChange?.(newCurrentValue);
    }, [value, multiple, onChange]);
    const getIsSelected = useCallback((curValue) => {
        if (!value)
            return false;
        if (typeof value === "string")
            return value === curValue;
        return value?.findIndex((cValue) => cValue === curValue) !== -1;
    }, [value]);
    const openPopover = useCallback(() => setIsOpen(true), []);
    const closePopover = useCallback(() => setIsOpen(false), []);
    const renderOption = useCallback(({ item, index }) => {
        const isSelected = getIsSelected(item.value);
        return (_jsx(SelectFieldItem, { selected: isSelected, color: color, nativeID: item.nativeID, disabled: item.disabled, value: item.value, onPress: onChangeValue, children: renderItem?.(item, isSelected) || item.label }, index));
    }, [color, getIsSelected, onChangeValue, renderItem]);
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
    const filteredItems = useMemo(() => currentItems?.filter(({ label: label2 }) => label2.toLowerCase().includes(searchText.toLowerCase())), [currentItems, searchText]);
    const emptyList = useMemo(() => (_jsx(Typography, { variant: "body2", style: styles.empty, children: emptyText })), [emptyText]);
    return (_jsx(NativeSelectField, { value: value, items: currentItems, color: color, disabled: disabled, onChange: onChange, multiple: multiple, children: _jsxs(Pressable, { disabled: disabled || isMobile, ref: ref, style: props.style, onPress: openPopover, children: [children || (_jsx(TextField, { endIcon: endIcon, ...props, label: label, disabled: disabled, color: color, value: currentText, editable: false })), !isMobile && (_jsx(Popover, { parentRef: ref, open: isOpen, onClose: closePopover, children: _jsx(FlatList, { data: filteredItems, ListHeaderComponent: searchInput, stickyHeaderIndices: searchable ? stickyHeaderIndices : undefined, removeClippedSubviews: true, ListEmptyComponent: emptyList, renderItem: renderOption, style: styles.list, ...flatListProps }) }))] }) }));
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
    native: {
        position: "absolute",
        top: 0,
        left: 0,
        height: "100%",
        width: "100%",
        opacity: 0,
    },
});
