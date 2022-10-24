"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Autocomplete = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const react_native_1 = require("react-native");
const react_2 = require("react");
const TextField_1 = require("../TextField");
const Popover_1 = require("../Popover");
const SelectFieldItem_1 = require("../SelectField/SelectFieldItem");
const utils_1 = require("../../utils");
const use_debounce_1 = require("use-debounce");
const defaultOnSearch = (_) => { };
exports.Autocomplete = (0, react_1.memo)(({ value, disabled, label, solo, delay = 500, items, onChange, onSearch, renderItem, color = "primary", flatListProps, clearText, clearable, children, ...props }) => {
    const [currentText, setCurrentText] = (0, react_2.useState)("");
    const debounced = (0, use_debounce_1.useDebouncedCallback)(onSearch || defaultOnSearch, delay);
    const ref = (0, react_1.useRef)(null);
    const [isFocused, setIsFocused] = (0, react_2.useState)(false);
    const currentItems = (0, react_1.useMemo)(() => {
        let newItems = items;
        if (clearable && clearText && !utils_1.isMobile) {
            newItems = [{ label: clearText || "", value: "clear" }, ...newItems];
        }
        return newItems;
    }, [items, clearable, clearText]);
    (0, react_1.useEffect)(() => {
        if (value)
            setCurrentText(value);
    }, [value]);
    const onChangeText = (0, react_1.useCallback)((newText) => {
        if (solo) {
            onChange?.(newText);
        }
        setCurrentText(newText);
        debounced(newText);
    }, [debounced, onChange, solo]);
    const openPopover = (0, react_1.useCallback)(() => setIsFocused(true), []);
    const closePopover = (0, react_1.useCallback)(() => {
        if (!solo)
            setCurrentText(value || "");
        setIsFocused(false);
    }, [solo, value]);
    const getLabel = (0, react_1.useCallback)((currentValue) => currentItems.find((item) => item.value === currentValue)?.label, [currentItems]);
    const onSelect = (0, react_1.useCallback)((newValue) => {
        const valueLabel = getLabel(newValue);
        if (!valueLabel)
            return;
        onChange?.(valueLabel);
        closePopover();
    }, [closePopover, getLabel, onChange]);
    const renderOption = (0, react_1.useCallback)(({ item, index }) => {
        return ((0, jsx_runtime_1.jsx)(SelectFieldItem_1.SelectFieldItem, { color: color, value: item.value, onPress: onSelect, children: renderItem?.(item) || item.label }, index));
    }, [color, onSelect, renderItem]);
    const filteredItems = (0, react_1.useMemo)(() => currentItems?.filter(({ label: label2 }) => label2.toLowerCase().includes(currentText.toLowerCase())), [currentItems, currentText]);
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { ref: ref, style: styles.container, children: [children || ((0, jsx_runtime_1.jsx)(TextField_1.TextField, { ...props, label: label, disabled: disabled, color: color, value: currentText, onFocus: openPopover, onBlur: closePopover, onChange: onChangeText })), (0, jsx_runtime_1.jsx)(Popover_1.Popover, { solo: true, parentRef: ref, open: isFocused && !!filteredItems.length, children: (0, jsx_runtime_1.jsx)(react_native_1.FlatList, { data: filteredItems, removeClippedSubviews: true, renderItem: renderOption, style: styles.list, ...flatListProps }) })] }));
});
exports.Autocomplete.displayName = "Autocomplete";
const styles = react_native_1.StyleSheet.create({
    container: {
        zIndex: +1,
    },
    list: { maxHeight: 200, maxWidth: 300, overflow: "scroll" },
});
