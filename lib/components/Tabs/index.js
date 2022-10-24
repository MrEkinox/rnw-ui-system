"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Tabs = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const react_native_1 = require("react-native");
const theme_1 = require("../../theme");
const react_2 = require("react");
const react_3 = require("react");
const useThemeStyle_1 = require("../../hooks/useThemeStyle");
const Tab_1 = require("./Tab");
exports.Tabs = (0, react_1.memo)(({ value, items, disabled, onChange, color = "primary", style, ...props }) => {
    const theme = (0, theme_1.useTheme)();
    const indicatorPositionAnim = (0, react_1.useMemo)(() => new react_native_1.Animated.Value(0), []);
    const indicatorWidthAnim = (0, react_1.useMemo)(() => new react_native_1.Animated.Value(0), []);
    const [tabsWidth, setTabsWidth] = (0, react_2.useState)({});
    const borderRadius = theme.borderRadius;
    const themeColor = theme.palette[color] || color;
    const selectedIndex = (0, react_1.useMemo)(() => items.findIndex((item) => item.value === value), [value, items]);
    (0, react_3.useEffect)(() => {
        const indicatorWidth = tabsWidth[selectedIndex] || 0;
        const indicatorPosition = Object.values(tabsWidth)
            .filter((_, index) => index <= selectedIndex)
            .reduce((acc, cur) => acc + cur, 0) - indicatorWidth;
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
    const onChangeIndex = (0, react_1.useCallback)((newValue) => onChange?.(newValue), [onChange]);
    const containerStyle = (0, useThemeStyle_1.useThemeStyle)((curTheme) => [
        {
            alignItems: "center",
            width: "fit-content",
            borderRadius: curTheme.borderRadius,
            backgroundColor: curTheme.palette.background.card,
        },
        style,
    ], [style]);
    const colorStyle = (0, react_1.useMemo)(() => ({
        height: "100%",
        position: "absolute",
        left: indicatorPositionAnim,
        width: indicatorWidthAnim,
        backgroundColor: themeColor,
        borderRadius,
    }), [borderRadius, indicatorPositionAnim, indicatorWidthAnim, themeColor]);
    const onLayout = (0, react_1.useCallback)((tabValue, event) => {
        const newItemIndex = items.findIndex((item) => item.value === tabValue);
        if (newItemIndex === -1)
            return;
        setTabsWidth((nextTabsWidth) => ({
            ...nextTabsWidth,
            [newItemIndex]: event.nativeEvent.layout.width,
        }));
    }, [items]);
    return ((0, jsx_runtime_1.jsxs)(react_native_1.ScrollView, { horizontal: true, ...props, contentContainerStyle: containerStyle, children: [selectedIndex !== -1 && (0, jsx_runtime_1.jsx)(react_native_1.Animated.View, { style: colorStyle }), items.map((item, index) => ((0, jsx_runtime_1.jsx)(Tab_1.Tab, { value: item.value, disabled: disabled, selected: index === selectedIndex, color: themeColor, onPress: onChangeIndex, onLayout: onLayout, children: item.label }, index)))] }));
});
exports.Tabs.displayName = "Tabs";
