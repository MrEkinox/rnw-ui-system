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
import { jsx as _jsx } from "react/jsx-runtime";
import { Typography } from "../Typography";
import { useHover } from "../../hooks/useHover";
import { useTheme } from "../../theme";
import { memo, useMemo, useCallback } from "react";
import { Pressable, } from "react-native";
import ColorJS from "color";
export const Tab = memo((_a) => {
    var { color, selected, value, children, onPress, onLayout } = _a, props = __rest(_a, ["color", "selected", "value", "children", "onPress", "onLayout"]);
    const hover = useHover();
    const theme = useTheme();
    const backgroundColor = theme.palette.background.card;
    const fondColor = selected ? color : backgroundColor;
    const style = useMemo(() => ({
        opacity: hover.isActive ? 0.5 : 1,
        paddingVertical: 10,
        paddingHorizontal: 20,
    }), [hover.isActive]);
    const onSelectTab = useCallback(() => onPress(value), [onPress, value]);
    const onLayoutTab = useCallback((e) => onLayout(value, e), [onLayout, value]);
    return (_jsx(Pressable, Object.assign({ onPress: onSelectTab, onLayout: onLayoutTab }, hover.handlers, props, { style: style }, { children: _jsx(Typography, Object.assign({ color: ColorJS(fondColor).isDark() ? "#FFF" : "#000" }, { children: children })) })));
});
Tab.displayName = "Tab";
