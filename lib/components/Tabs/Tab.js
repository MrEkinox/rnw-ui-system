import { jsx as _jsx } from "react/jsx-runtime";
import { Typography } from "../Typography";
import { useHover } from "../../hooks/useHover";
import { useTheme } from "../../theme";
import { memo, useMemo, useCallback } from "react";
import { Pressable, } from "react-native";
import ColorJS from "color";
export const Tab = memo(({ color, selected, value, children, onPress, onLayout, ...props }) => {
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
    return (_jsx(Pressable, { onPress: onSelectTab, onLayout: onLayoutTab, ...hover.handlers, ...props, style: style, children: _jsx(Typography, { color: ColorJS(fondColor).isDark() ? "#FFF" : "#000", children: children }) }));
});
Tab.displayName = "Tab";
