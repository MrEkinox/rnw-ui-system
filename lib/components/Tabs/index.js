import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { memo, useCallback, useMemo } from "react";
import { Animated, ScrollView, } from "react-native";
import { useTheme } from "../../theme";
import { useState } from "react";
import { useEffect } from "react";
import { useThemeStyle } from "../../hooks/useThemeStyle";
import { Tab } from "./Tab";
export const Tabs = memo(({ value, items, disabled, onChange, color = "primary", style, ...props }) => {
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
    const onChangeIndex = useCallback((newValue) => onChange?.(newValue), [onChange]);
    const containerStyle = useThemeStyle((curTheme) => [
        {
            alignItems: "center",
            width: "fit-content",
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
        setTabsWidth((nextTabsWidth) => ({
            ...nextTabsWidth,
            [newItemIndex]: event.nativeEvent.layout.width,
        }));
    }, [items]);
    return (_jsxs(ScrollView, { horizontal: true, ...props, contentContainerStyle: containerStyle, children: [selectedIndex !== -1 && _jsx(Animated.View, { style: colorStyle }), items.map((item, index) => (_jsx(Tab, { value: item.value, disabled: disabled, selected: index === selectedIndex, color: themeColor, onPress: onChangeIndex, onLayout: onLayout, children: item.label }, index)))] }));
});
Tabs.displayName = "Tabs";
