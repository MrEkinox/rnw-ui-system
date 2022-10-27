import { jsx as _jsx } from "react/jsx-runtime";
import { Typography } from "../Typography";
import { useHover } from "../../hooks/useHover";
import { useThemeStyle } from "../../hooks/useThemeStyle";
import { memo, useCallback } from "react";
import ColorJS from "color";
import { Pressable } from "react-native";
export const SelectFieldItem = memo(({ children, disabled, value, onPress, color = "primary", selected, ...props }) => {
    const hover = useHover();
    const style = useThemeStyle((theme) => {
        const selectedColor = ColorJS(theme.palette[color] || color)
            .fade(0.8)
            .toString();
        return {
            paddingHorizontal: 20,
            paddingVertical: 10,
            backgroundColor: selected ? selectedColor : undefined,
            opacity: hover.isActive || disabled ? 0.5 : 1,
        };
    }, [color, selected, hover.isActive, disabled]);
    const onClick = useCallback(() => onPress?.(value), [onPress, value]);
    return (_jsx(Pressable, { disabled: disabled, onPress: onClick, ...hover.handlers, ...props, style: style, children: typeof children === "string" ? (_jsx(Typography, { children: children })) : (children) }));
});
SelectFieldItem.displayName = "SelectFieldItem";
