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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Tabs = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var react_native_1 = require("react-native");
var theme_1 = require("../../theme");
var react_2 = require("react");
var react_3 = require("react");
var useThemeStyle_1 = require("../../hooks/useThemeStyle");
var Tab_1 = require("./Tab");
exports.Tabs = (0, react_1.memo)(function (_a) {
    var value = _a.value, items = _a.items, disabled = _a.disabled, onChange = _a.onChange, _b = _a.color, color = _b === void 0 ? "primary" : _b, style = _a.style, props = __rest(_a, ["value", "items", "disabled", "onChange", "color", "style"]);
    var theme = (0, theme_1.useTheme)();
    var indicatorPositionAnim = (0, react_1.useMemo)(function () { return new react_native_1.Animated.Value(0); }, []);
    var indicatorWidthAnim = (0, react_1.useMemo)(function () { return new react_native_1.Animated.Value(0); }, []);
    var _c = (0, react_2.useState)({}), tabsWidth = _c[0], setTabsWidth = _c[1];
    var borderRadius = theme.borderRadius;
    var themeColor = theme.palette[color] || color;
    var selectedIndex = (0, react_1.useMemo)(function () { return items.findIndex(function (item) { return item.value === value; }); }, [value, items]);
    (0, react_3.useEffect)(function () {
        var indicatorWidth = tabsWidth[selectedIndex] || 0;
        var indicatorPosition = Object.values(tabsWidth)
            .filter(function (_, index) { return index <= selectedIndex; })
            .reduce(function (acc, cur) { return acc + cur; }, 0) - indicatorWidth;
        react_native_1.Animated.timing(indicatorWidthAnim, {
            toValue: indicatorWidth,
            duration: 200,
            useNativeDriver: false,
        }).start();
        react_native_1.Animated.timing(indicatorPositionAnim, {
            toValue: indicatorPosition,
            duration: 200,
            useNativeDriver: false,
        }).start();
    }, [indicatorPositionAnim, indicatorWidthAnim, selectedIndex, tabsWidth]);
    var onChangeIndex = (0, react_1.useCallback)(function (newValue) { return onChange === null || onChange === void 0 ? void 0 : onChange(newValue); }, [onChange]);
    var containerStyle = (0, useThemeStyle_1.useThemeStyle)(function (curTheme) { return [
        {
            alignItems: "center",
            width: "fit-content",
            borderRadius: curTheme.borderRadius,
            backgroundColor: curTheme.palette.background.card,
        },
        style,
    ]; }, [style]);
    var colorStyle = (0, react_1.useMemo)(function () { return ({
        height: "100%",
        position: "absolute",
        left: indicatorPositionAnim,
        width: indicatorWidthAnim,
        backgroundColor: themeColor,
        borderRadius: borderRadius,
    }); }, [borderRadius, indicatorPositionAnim, indicatorWidthAnim, themeColor]);
    var onLayout = (0, react_1.useCallback)(function (tabValue, event) {
        var newItemIndex = items.findIndex(function (item) { return item.value === tabValue; });
        if (newItemIndex === -1)
            return;
        setTabsWidth(function (nextTabsWidth) {
            var _a;
            return (__assign(__assign({}, nextTabsWidth), (_a = {}, _a[newItemIndex] = event.nativeEvent.layout.width, _a)));
        });
    }, [items]);
    return ((0, jsx_runtime_1.jsxs)(react_native_1.ScrollView, __assign({ horizontal: true }, props, { contentContainerStyle: containerStyle }, { children: [selectedIndex !== -1 && (0, jsx_runtime_1.jsx)(react_native_1.Animated.View, { style: colorStyle }), items.map(function (item, index) { return ((0, jsx_runtime_1.jsx)(Tab_1.Tab, __assign({ value: item.value, disabled: disabled, selected: index === selectedIndex, color: themeColor, onPress: onChangeIndex, onLayout: onLayout }, { children: item.label }), index)); })] })));
});
exports.Tabs.displayName = "Tabs";
