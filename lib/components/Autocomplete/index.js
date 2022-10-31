import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { memo, useCallback, useEffect, useMemo, useRef } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import { useState } from "react";
import { TextField } from "../TextField";
import { Popover } from "../Popover";
import { SelectFieldItem } from "../SelectField/SelectFieldItem";
import { useDebouncedCallback } from "use-debounce";
const defaultOnSearch = (_) => { };
export const Autocomplete = memo(({ value, disabled, label, solo, delay = 500, items, onChange, onSearch, renderItem, color = "primary", flatListProps, clearText, clearable, children, ...props }) => {
    const [currentText, setCurrentText] = useState("");
    const debounced = useDebouncedCallback(onSearch || defaultOnSearch, delay);
    const ref = useRef(null);
    const [isFocused, setIsFocused] = useState(false);
    const currentItems = useMemo(() => {
        if (clearable && clearText) {
            return [{ label: clearText || "", value: "clear" }, ...items];
        }
        return items;
    }, [items, clearable, clearText]);
    useEffect(() => {
        setCurrentText(value || "");
    }, [value]);
    const onChangeText = useCallback((newText) => {
        if (solo) {
            onChange?.(newText);
        }
        setCurrentText(newText);
        debounced(newText);
    }, [debounced, onChange, solo]);
    const openPopover = useCallback(() => setIsFocused(true), []);
    const closePopover = useCallback(() => {
        if (!solo)
            setCurrentText(value || "");
        setIsFocused(false);
    }, [solo, value]);
    const onBlur = useCallback(() => {
        setTimeout(closePopover, 100);
    }, [closePopover]);
    const getLabel = useCallback((currentValue) => currentItems.find((item) => item.value === currentValue)?.label, [currentItems]);
    const onSelect = useCallback((newValue) => {
        const valueLabel = getLabel(newValue);
        if (!valueLabel)
            return;
        onChange?.(valueLabel);
        closePopover();
    }, [getLabel, closePopover, onChange]);
    const renderOption = useCallback(({ item, index }) => {
        return (_jsx(SelectFieldItem, { color: color, value: item.value, onPress: onSelect, children: renderItem?.(item) || item.label }, index));
    }, [color, onSelect, renderItem]);
    const filteredItems = useMemo(() => currentItems?.filter(({ label: label2 }) => label2 !== currentText &&
        label2
            .toLowerCase()
            .normalize("NFD")
            .includes(currentText.toLowerCase().normalize("NFD"))), [currentItems, currentText]);
    return (_jsxs(View, { ref: ref, style: styles.container, children: [children || (_jsx(TextField, { ...props, label: label, disabled: disabled, color: color, value: currentText, onFocus: openPopover, onBlur: onBlur, onChange: onChangeText })), _jsx(Popover, { solo: true, parentRef: ref, open: isFocused && !!filteredItems.length, children: _jsx(FlatList, { data: filteredItems, removeClippedSubviews: true, renderItem: renderOption, style: styles.list, ...flatListProps }) })] }));
});
Autocomplete.displayName = "Autocomplete";
const styles = StyleSheet.create({
    container: {
        zIndex: +1,
    },
    list: { maxHeight: 200, maxWidth: 300, overflow: "scroll" },
});
