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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SelectField = exports.NativeSelectField = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var react_native_1 = require("react-native");
var react_2 = require("react");
var TextField_1 = require("../TextField");
var Icon_1 = require("../Icon");
var Popover_1 = require("../Popover");
var SelectFieldItem_1 = require("./SelectFieldItem");
var utils_1 = require("../../utils");
var theme_1 = require("../../theme");
var Typography_1 = require("../Typography");
var getSelectedOptions = function (selectedOptions) {
    return Array.from({ length: selectedOptions.length }).map(function (_, index) { var _a; return (_a = selectedOptions.item(index)) === null || _a === void 0 ? void 0 : _a.value; });
};
exports.NativeSelectField = (0, react_1.memo)(function (_a) {
    var children = _a.children, items = _a.items, value = _a.value, onChange = _a.onChange, _b = _a.color, color = _b === void 0 ? "primary" : _b, disabled = _a.disabled, multiple = _a.multiple;
    var theme = (0, theme_1.useTheme)();
    var themeColor = theme.palette[color] || color;
    var id = (0, react_1.useId)();
    var onChangeValue = (0, react_1.useCallback)(function (event) {
        var newValue = multiple
            ? getSelectedOptions(event.target.selectedOptions)
            : event.target.value;
        onChange === null || onChange === void 0 ? void 0 : onChange(newValue);
    }, [multiple, onChange]);
    if (!utils_1.isMobile)
        return (0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: children });
    return ((0, jsx_runtime_1.jsxs)("label", __assign({ htmlFor: "select-".concat(id) }, { children: [(0, jsx_runtime_1.jsx)("select", __assign({ disabled: disabled, id: "select-".concat(id), value: value || "default", color: themeColor, onChange: onChangeValue, multiple: multiple, style: styles.native }, { children: items === null || items === void 0 ? void 0 : items.map(function (item, index) { return ((0, jsx_runtime_1.jsx)("option", __assign({ disabled: item.disabled, id: item.nativeID, value: item.value }, { children: item.label }), index)); }) })), children] })));
});
var stickyHeaderIndices = [0];
exports.SelectField = (0, react_1.memo)(function (_a) {
    var value = _a.value, disabled = _a.disabled, label = _a.label, items = _a.items, multiple = _a.multiple, searchable = _a.searchable, onChange = _a.onChange, renderItem = _a.renderItem, _b = _a.color, color = _b === void 0 ? "primary" : _b, flatListProps = _a.flatListProps, clearText = _a.clearText, clearable = _a.clearable, children = _a.children, props = __rest(_a, ["value", "disabled", "label", "items", "multiple", "searchable", "onChange", "renderItem", "color", "flatListProps", "clearText", "clearable", "children"]);
    var theme = (0, theme_1.useTheme)();
    var _c = (0, react_2.useState)(""), searchText = _c[0], setSearchText = _c[1];
    var ref = (0, react_1.useRef)(null);
    var _d = (0, react_2.useState)(false), isOpen = _d[0], setIsOpen = _d[1];
    var emptyText = theme.intl.selectField.empty;
    var disabledColor = theme.palette.disabled;
    var themeColor = theme.palette[color] || color;
    var fontFamily = theme.typography.fontFamily;
    var backgroundColor = theme.palette.background.card;
    var fontColor = theme.palette.text;
    var currentItems = (0, react_1.useMemo)(function () {
        var newItems = items;
        if (clearable && clearText && !utils_1.isMobile) {
            newItems = __spreadArray([{ label: clearText || "", value: "clear" }], newItems, true);
        }
        if (utils_1.isMobile && !multiple) {
            newItems = __spreadArray([
                { label: label || "", value: "default", disabled: true }
            ], newItems, true);
        }
        return newItems;
    }, [items, clearable, clearText, multiple, label]);
    var currentText = (0, react_1.useMemo)(function () {
        return currentItems
            .filter(function (item) {
            if (typeof value === "string")
                return item.value === value;
            return value === null || value === void 0 ? void 0 : value.includes(item.value);
        })
            .map(function (item) { return item.label; })
            .join(", ") || "";
    }, [value, currentItems]);
    var onChangeValue = (0, react_1.useCallback)(function (newValue) {
        var newCurrentValue = newValue;
        if (newValue === value || newValue === "clear")
            newCurrentValue = undefined;
        if (multiple && value instanceof Array) {
            if (value === null || value === void 0 ? void 0 : value.includes(newValue)) {
                newCurrentValue = value.filter(function (cValue) { return cValue !== newValue; });
            }
            else if (newValue === "clear") {
                newCurrentValue = [];
            }
            else
                newCurrentValue = __spreadArray(__spreadArray([], value, true), [newValue], false);
        }
        if (!multiple)
            setIsOpen(false);
        onChange === null || onChange === void 0 ? void 0 : onChange(newCurrentValue);
    }, [value, multiple, onChange]);
    var getIsSelected = (0, react_1.useCallback)(function (curValue) {
        if (!value)
            return false;
        if (typeof value === "string")
            return value === curValue;
        return (value === null || value === void 0 ? void 0 : value.findIndex(function (cValue) { return cValue === curValue; })) !== -1;
    }, [value]);
    var openPopover = (0, react_1.useCallback)(function () { return setIsOpen(true); }, []);
    var closePopover = (0, react_1.useCallback)(function () { return setIsOpen(false); }, []);
    var renderOption = (0, react_1.useCallback)(function (_a) {
        var item = _a.item, index = _a.index;
        var isSelected = getIsSelected(item.value);
        return ((0, jsx_runtime_1.jsx)(SelectFieldItem_1.SelectFieldItem, __assign({ selected: isSelected, color: color, value: item.value, onPress: onChangeValue }, { children: (renderItem === null || renderItem === void 0 ? void 0 : renderItem(item, isSelected)) || item.label }), index));
    }, [color, getIsSelected, onChangeValue, renderItem]);
    var endIcon = (0, react_1.useMemo)(function () { return (0, jsx_runtime_1.jsx)(Icon_1.Icon, { type: "Octicons", name: "chevron-down", style: styles.icon }); }, []);
    var inputStyle = (0, react_1.useMemo)(function () { return ({
        color: fontColor,
        fontFamily: fontFamily,
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderBottomWidth: 1,
        borderBottomColor: themeColor,
        backgroundColor: backgroundColor,
    }); }, [themeColor, backgroundColor, fontColor, fontFamily]);
    var searchInput = (0, react_1.useMemo)(function () {
        if (!searchable)
            return null;
        return ((0, jsx_runtime_1.jsx)(react_native_1.TextInput, { autoFocus: true, onChangeText: setSearchText, style: inputStyle, nativeID: "searchCountryInput", value: searchText, placeholderTextColor: disabledColor, selectionColor: themeColor, placeholder: "Rechercher" }));
    }, [searchable, disabledColor, inputStyle, searchText, themeColor]);
    var filteredItems = (0, react_1.useMemo)(function () {
        return currentItems === null || currentItems === void 0 ? void 0 : currentItems.filter(function (_a) {
            var label2 = _a.label;
            return label2.toLowerCase().includes(searchText.toLowerCase());
        });
    }, [currentItems, searchText]);
    var emptyList = (0, react_1.useMemo)(function () { return ((0, jsx_runtime_1.jsx)(Typography_1.Typography, __assign({ variant: "body2", style: styles.empty }, { children: emptyText }))); }, [emptyText]);
    return ((0, jsx_runtime_1.jsx)(exports.NativeSelectField, __assign({ value: value, items: currentItems, color: color, disabled: disabled, onChange: onChange, multiple: multiple }, { children: (0, jsx_runtime_1.jsxs)(react_native_1.Pressable, __assign({ disabled: disabled || utils_1.isMobile, ref: ref, style: props.style, onPress: openPopover }, { children: [children || ((0, jsx_runtime_1.jsx)(TextField_1.TextField, __assign({ endIcon: endIcon }, props, { label: label, disabled: disabled, color: color, value: currentText, editable: false }))), !utils_1.isMobile && ((0, jsx_runtime_1.jsx)(Popover_1.Popover, __assign({ parentRef: ref, open: isOpen, onClose: closePopover }, { children: (0, jsx_runtime_1.jsx)(react_native_1.FlatList, __assign({ data: filteredItems, ListHeaderComponent: searchInput, stickyHeaderIndices: searchable ? stickyHeaderIndices : undefined, removeClippedSubviews: true, ListEmptyComponent: emptyList, renderItem: renderOption, style: styles.list }, flatListProps)) })))] })) })));
});
exports.SelectField.displayName = "SelectField";
var styles = react_native_1.StyleSheet.create({
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
