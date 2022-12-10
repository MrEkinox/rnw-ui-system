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
import { memo, useMemo } from "react";
import { Pressable, } from "react-native";
import { useTheme } from "../../theme";
import ColorJS from "color";
import { Typography } from "../Typography";
import { useHover } from "../../hooks/useHover";
export const Chip = memo((_a) => {
    var { children, size, disabled, variant, color = "primary", loading } = _a, props = __rest(_a, ["children", "size", "disabled", "variant", "color", "loading"]);
    const theme = useTheme();
    const hover = useHover();
    const borderRadius = theme.borderRadius;
    const themeColor = theme.palette[color] || color;
    const borderWidth = variant === "outlined" ? 2 : 0;
    const containedColor = ColorJS(ColorJS(themeColor).isDark() ? "#FFF" : "#000")
        .fade(disabled ? 0.5 : 0)
        .toString();
    const variantStyle = useMemo(() => {
        if (variant === "outlined") {
            return {
                color: themeColor,
                borderColor: themeColor,
                borderWidth,
                borderStyle: "solid",
                backgroundColor: hover.isActive
                    ? ColorJS(themeColor).fade(0.7).toString()
                    : undefined,
            };
        }
        if (variant === "hovered") {
            return {
                color: themeColor,
                backgroundColor: hover.isActive
                    ? ColorJS(themeColor).fade(0.7).toString()
                    : undefined,
            };
        }
        if (variant === "fade") {
            return {
                color: themeColor,
                opacity: hover.isActive ? 0.5 : 1,
                backgroundColor: ColorJS(themeColor).fade(0.7).toString(),
            };
        }
        if (variant === "text") {
            return {
                color: themeColor,
                opacity: hover.isActive ? 0.5 : 1,
            };
        }
        return {
            backgroundColor: hover.isActive
                ? ColorJS(themeColor).fade(0.2).toString()
                : themeColor,
            color: containedColor,
        };
    }, [borderWidth, containedColor, hover.isActive, themeColor, variant]);
    const content = useMemo(() => {
        if (typeof children === "string") {
            return (_jsx(Typography, Object.assign({ color: variantStyle["color"] }, { children: children })));
        }
        return children;
    }, [children, variantStyle]);
    const sizeStyle = useMemo(() => {
        if (variant === "text")
            return {};
        if (size === "large") {
            return {
                borderRadius,
                paddingHorizontal: 20 - borderWidth,
                paddingVertical: 10 - borderWidth,
                fontSize: 25,
            };
        }
        if (size === "small") {
            return {
                borderRadius: borderRadius / 2,
                paddingHorizontal: 5 - borderWidth,
                paddingVertical: 3 - borderWidth,
                fontSize: 17,
            };
        }
        return {
            borderRadius: borderRadius / 1.5,
            paddingHorizontal: 10 - borderWidth,
            paddingVertical: 5 - borderWidth,
            fontSize: 20,
        };
    }, [borderWidth, borderRadius, variant, size]);
    const style = useMemo(() => [
        { width: "fit-content" },
        loading && { width: 70, height: 40 },
        variantStyle,
        sizeStyle,
        props.style,
    ], [variantStyle, loading, sizeStyle, props.style]);
    return (_jsx(Pressable, Object.assign({}, hover.handlers, { disabled: disabled || loading || !props.onPress, nativeID: "chip" }, props, { style: style }, { children: content })));
});
Chip.displayName = "Chip";
