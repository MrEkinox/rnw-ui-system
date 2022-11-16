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
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { memo, useCallback, useEffect, useMemo, useRef } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import { useState } from "react";
import { TextField } from "../TextField";
import { Popover } from "../Popover";
import { SelectFieldItem } from "../SelectField/SelectFieldItem";
import { useDebouncedCallback } from "use-debounce";
import { Card } from "../Card";
const defaultOnSearch = (_) => { };
export const Autocomplete = memo((_a) => {
    var { value, disabled, label, solo, delay = 500, items, solid, onChange, onSearch, renderItem, color = "primary", flatListProps, clearText, clearable, children } = _a, props = __rest(_a, ["value", "disabled", "label", "solo", "delay", "items", "solid", "onChange", "onSearch", "renderItem", "color", "flatListProps", "clearText", "clearable", "children"]);
    const [currentText, setCurrentText] = useState("");
    const debounced = useDebouncedCallback(onSearch || defaultOnSearch, delay);
    const ref = useRef(null);
    const [isFocused, setIsFocused] = useState(false);
    useEffect(() => {
        setCurrentText(value || "");
    }, [value]);
    useEffect(() => {
        if (!isFocused && !solo) {
            setCurrentText(value || "");
        }
    }, [isFocused, solo, value]);
    const onChangeText = useCallback((newText) => {
        if (solo) {
            onChange === null || onChange === void 0 ? void 0 : onChange(newText);
        }
        setCurrentText(newText);
        debounced(newText);
    }, [debounced, onChange, solo]);
    const openPopover = useCallback(() => setIsFocused(true), []);
    const closePopover = useCallback(() => setIsFocused(false), []);
    const onSelect = useCallback((newValue) => {
        onChange === null || onChange === void 0 ? void 0 : onChange(newValue);
        closePopover();
    }, [onChange, closePopover]);
    const renderOption = useCallback(({ item, index }) => {
        return (_jsx(SelectFieldItem, Object.assign({ color: color, value: item.value, onPress: onSelect }, { children: (renderItem === null || renderItem === void 0 ? void 0 : renderItem(item)) || item.label }), index));
    }, [color, onSelect, renderItem]);
    const filteredItems = useMemo(() => items === null || items === void 0 ? void 0 : items.filter(({ label: label2 }) => label2 !== currentText &&
        label2
            .toLowerCase()
            .normalize("NFD")
            .includes(currentText.toLowerCase().normalize("NFD"))), [items, currentText]);
    const currentItems = useMemo(() => {
        if (clearable && clearText) {
            return [{ label: clearText || "", value: "" }, ...filteredItems];
        }
        return filteredItems;
    }, [filteredItems, clearable, clearText]);
    const content = (_jsx(FlatList, Object.assign({ data: currentItems, removeClippedSubviews: true, renderItem: renderOption, style: styles.list }, flatListProps)));
    return (_jsxs(View, Object.assign({ ref: ref, style: styles.container }, { children: [children || (_jsx(TextField, Object.assign({}, props, { label: label, disabled: disabled, color: color, value: currentText, onFocus: openPopover, onBlur: closePopover, containerStyle: solid && !!filteredItems.length && styles.noBorderInput, onChange: onChangeText }))), solid && !!filteredItems.length && (_jsx(Card, Object.assign({ variant: "outlined", style: styles.card }, { children: content }))), !solid && (_jsx(Popover, Object.assign({ solo: true, parentRef: ref, open: isFocused && !!filteredItems.length }, { children: content })))] })));
});
Autocomplete.displayName = "Autocomplete";
const styles = StyleSheet.create({
    container: {
        zIndex: +1,
    },
    card: {
        borderTopWidth: 0,
        borderTopLeftRadius: 0,
        borderTopRightRadius: 0,
    },
    noBorderInput: {
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0,
    },
    list: { maxHeight: 200, maxWidth: 300, overflow: "scroll" },
});
