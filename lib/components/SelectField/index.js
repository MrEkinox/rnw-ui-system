"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SelectField = exports.NativeSelectField = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const react_native_1 = require("react-native");
const react_2 = require("react");
const TextField_1 = require("../TextField");
const Icon_1 = require("../Icon");
const Popover_1 = require("../Popover");
const SelectFieldItem_1 = require("./SelectFieldItem");
const utils_1 = require("../../utils");
const theme_1 = require("../../theme");
const Typography_1 = require("../Typography");
const getSelectedOptions = (selectedOptions) => {
    return Array.from({ length: selectedOptions.length }).map((_, index) => selectedOptions.item(index)?.value);
};
exports.NativeSelectField = (0, react_1.memo)(({ children, items, value, onChange, color = "primary", disabled, multiple, }) => {
    const theme = (0, theme_1.useTheme)();
    const themeColor = theme.palette[color] || color;
    const id = (0, react_1.useId)();
    const onChangeValue = (0, react_1.useCallback)((event) => {
        const newValue = multiple
            ? getSelectedOptions(event.target.selectedOptions)
            : event.target.value;
        onChange?.(newValue);
    }, [multiple, onChange]);
    if (!utils_1.isMobile)
        return (0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: children });
    return ((0, jsx_runtime_1.jsxs)("label", { htmlFor: `select-${id}`, children: [(0, jsx_runtime_1.jsx)("select", { disabled: disabled, id: `select-${id}`, value: value || "default", color: themeColor, onChange: onChangeValue, multiple: multiple, style: styles.native, children: items?.map((item, index) => ((0, jsx_runtime_1.jsx)("option", { disabled: item.disabled, id: item.nativeID, value: item.value, children: item.label }, index))) }), children] }));
});
const stickyHeaderIndices = [0];
exports.SelectField = (0, react_1.memo)(({ value, disabled, label, items, multiple, searchable, onChange, renderItem, color = "primary", flatListProps, clearText, clearable, children, ...props }) => {
    const theme = (0, theme_1.useTheme)();
    const [searchText, setSearchText] = (0, react_2.useState)("");
    const ref = (0, react_1.useRef)(null);
    const [isOpen, setIsOpen] = (0, react_2.useState)(false);
    const emptyText = theme.intl.selectField.empty;
    const disabledColor = theme.palette.disabled;
    const themeColor = theme.palette[color] || color;
    const fontFamily = theme.typography.fontFamily;
    const backgroundColor = theme.palette.background.card;
    const fontColor = theme.palette.text;
    const currentItems = (0, react_1.useMemo)(() => {
        let newItems = items;
        if (clearable && clearText && !utils_1.isMobile) {
            newItems = [{ label: clearText || "", value: "clear" }, ...newItems];
        }
        if (utils_1.isMobile && !multiple) {
            newItems = [
                { label: label || "", value: "default", disabled: true },
                ...newItems,
            ];
        }
        return newItems;
    }, [items, clearable, clearText, multiple, label]);
    const currentText = (0, react_1.useMemo)(() => currentItems
        .filter((item) => {
        if (typeof value === "string")
            return item.value === value;
        return value?.includes(item.value);
    })
        .map((item) => item.label)
        .join(", ") || "", [value, currentItems]);
    const onChangeValue = (0, react_1.useCallback)((newValue) => {
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
    const getIsSelected = (0, react_1.useCallback)((curValue) => {
        if (!value)
            return false;
        if (typeof value === "string")
            return value === curValue;
        return value?.findIndex((cValue) => cValue === curValue) !== -1;
    }, [value]);
    const openPopover = (0, react_1.useCallback)(() => setIsOpen(true), []);
    const closePopover = (0, react_1.useCallback)(() => setIsOpen(false), []);
    const renderOption = (0, react_1.useCallback)(({ item, index }) => {
        const isSelected = getIsSelected(item.value);
        return ((0, jsx_runtime_1.jsx)(SelectFieldItem_1.SelectFieldItem, { selected: isSelected, color: color, value: item.value, onPress: onChangeValue, children: renderItem?.(item, isSelected) || item.label }, index));
    }, [color, getIsSelected, onChangeValue, renderItem]);
    const endIcon = (0, react_1.useMemo)(() => (0, jsx_runtime_1.jsx)(Icon_1.Icon, { type: "Octicons", name: "chevron-down", style: styles.icon }), []);
    const inputStyle = (0, react_1.useMemo)(() => ({
        color: fontColor,
        fontFamily,
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderBottomWidth: 1,
        borderBottomColor: themeColor,
        backgroundColor,
    }), [themeColor, backgroundColor, fontColor, fontFamily]);
    const searchInput = (0, react_1.useMemo)(() => {
        if (!searchable)
            return null;
        return ((0, jsx_runtime_1.jsx)(react_native_1.TextInput, { autoFocus: true, onChangeText: setSearchText, style: inputStyle, nativeID: "searchCountryInput", value: searchText, placeholderTextColor: disabledColor, selectionColor: themeColor, placeholder: "Rechercher" }));
    }, [searchable, disabledColor, inputStyle, searchText, themeColor]);
    const filteredItems = (0, react_1.useMemo)(() => currentItems?.filter(({ label: label2 }) => label2.toLowerCase().includes(searchText.toLowerCase())), [currentItems, searchText]);
    const emptyList = (0, react_1.useMemo)(() => ((0, jsx_runtime_1.jsx)(Typography_1.Typography, { variant: "body2", style: styles.empty, children: emptyText })), [emptyText]);
    return ((0, jsx_runtime_1.jsx)(exports.NativeSelectField, { value: value, items: currentItems, color: color, disabled: disabled, onChange: onChange, multiple: multiple, children: (0, jsx_runtime_1.jsxs)(react_native_1.Pressable, { disabled: disabled || utils_1.isMobile, ref: ref, style: props.style, onPress: openPopover, children: [children || ((0, jsx_runtime_1.jsx)(TextField_1.TextField, { endIcon: endIcon, ...props, label: label, disabled: disabled, color: color, value: currentText, editable: false })), !utils_1.isMobile && ((0, jsx_runtime_1.jsx)(Popover_1.Popover, { parentRef: ref, open: isOpen, onClose: closePopover, children: (0, jsx_runtime_1.jsx)(react_native_1.FlatList, { data: filteredItems, ListHeaderComponent: searchInput, stickyHeaderIndices: searchable ? stickyHeaderIndices : undefined, removeClippedSubviews: true, ListEmptyComponent: emptyList, renderItem: renderOption, style: styles.list, ...flatListProps }) }))] }) }));
});
exports.SelectField.displayName = "SelectField";
const styles = react_native_1.StyleSheet.create({
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
