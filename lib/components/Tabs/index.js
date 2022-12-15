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
import { memo, useCallback, useMemo } from "react";
import { Animated, ScrollView, } from "react-native";
import { useTheme } from "../../theme";
import { useState } from "react";
import { useEffect } from "react";
import { useThemeStyle } from "../../hooks/useThemeStyle";
import { Tab } from "./Tab";
export const Tabs = memo((_a) => {
    var { value, items, disabled, onChange, color = "primary", style, size, scrollStyle } = _a, props = __rest(_a, ["value", "items", "disabled", "onChange", "color", "style", "size", "scrollStyle"]);
    const theme = useTheme();
    const indicatorPositionAnim = useMemo(() => new Animated.Value(0), []);
    const indicatorWidthAnim = useMemo(() => new Animated.Value(0), []);
    const [tabsWidth, setTabsWidth] = useState({});
    const borderRadius = theme.borderRadius;
    const themeColor = theme.palette[color] || color;
    const selectedIndex = useMemo(() => items.findIndex((item) => item.value === value), [value, items]);
    useEffect(() => {
        const indicatorWidth = tabsWidth[selectedIndex] || 0;
        const indicatorPosition = Object.values(tabsWidth)
            .filter((_, index) => index <= selectedIndex)
            .reduce((acc, cur) => acc + cur, 0) - indicatorWidth;
        Animated.timing(indicatorWidthAnim, {
            toValue: indicatorWidth,
            duration: 200,
            useNativeDriver: false,
        }).start();
        Animated.timing(indicatorPositionAnim, {
            toValue: indicatorPosition,
            duration: 200,
            useNativeDriver: false,
        }).start();
    }, [indicatorPositionAnim, indicatorWidthAnim, selectedIndex, tabsWidth]);
    const onChangeIndex = useCallback((newValue) => onChange === null || onChange === void 0 ? void 0 : onChange(newValue), [onChange]);
    const containerStyle = useThemeStyle((curTheme) => [
        {
            alignItems: "center",
            width: "max-content",
            borderRadius: curTheme.borderRadius,
            backgroundColor: curTheme.palette.background.card,
        },
        style,
    ], [style]);
    const colorStyle = useMemo(() => ({
        height: "100%",
        position: "absolute",
        left: indicatorPositionAnim,
        width: indicatorWidthAnim,
        backgroundColor: themeColor,
        borderRadius,
    }), [borderRadius, indicatorPositionAnim, indicatorWidthAnim, themeColor]);
    const onLayout = useCallback((tabValue, event) => {
        const newItemIndex = items.findIndex((item) => item.value === tabValue);
        if (newItemIndex === -1)
            return;
        setTabsWidth((nextTabsWidth) => (Object.assign(Object.assign({}, nextTabsWidth), { [newItemIndex]: event.nativeEvent.layout.width })));
    }, [items]);
    return (_jsxs(ScrollView, Object.assign({ horizontal: true }, props, { style: scrollStyle, contentContainerStyle: containerStyle }, { children: [selectedIndex !== -1 && _jsx(Animated.View, { style: colorStyle }), items.map((item, index) => (_jsx(Tab, Object.assign({ value: item.value, disabled: disabled, size: size, selected: index === selectedIndex, color: themeColor, onPress: onChangeIndex, onLayout: onLayout }, { children: item.label }), index)))] })));
});
Tabs.displayName = "Tabs";
