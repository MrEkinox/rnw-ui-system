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
import { useThemeStyle } from "../../hooks/useThemeStyle";
import { memo, useCallback } from "react";
import ColorJS from "color";
import { Pressable } from "react-native";
export const SelectFieldItem = memo((_a) => {
    var { children, disabled, value, onPress, color = "primary", selected } = _a, props = __rest(_a, ["children", "disabled", "value", "onPress", "color", "selected"]);
    const hover = useHover();
    const style = useThemeStyle((theme) => {
        const selectedColor = ColorJS(theme.palette[color] || color)
            .fade(0.8)
            .toString();
        return {
            paddingHorizontal: 15,
            paddingVertical: 10,
            backgroundColor: selected ? selectedColor : undefined,
            opacity: hover.isActive || disabled ? 0.5 : 1,
        };
    }, [color, selected, hover.isActive, disabled]);
    const onClick = useCallback(() => onPress === null || onPress === void 0 ? void 0 : onPress(value), [onPress, value]);
    return (_jsx(Pressable, Object.assign({ disabled: disabled, onPress: onClick }, hover.handlers, props, { style: style }, { children: typeof children === "string" ? (_jsx(Typography, Object.assign({ variant: "body2" }, { children: children }))) : (children) })));
});
SelectFieldItem.displayName = "SelectFieldItem";
