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
import { View } from "react-native";
import { computeBorderRadius } from "../../utils";
import { useTheme } from "../../theme";
export const Card = memo((_a) => {
    var { children, square, variant, elevation = 5, color = "primary", style } = _a, props = __rest(_a, ["children", "square", "variant", "elevation", "color", "style"]);
    const theme = useTheme();
    const borderRadius = square ? 0 : theme.borderRadius;
    const backgroundColor = theme.palette.background.card;
    const themeColor = theme.palette[color] || color;
    const outlinedStyle = useMemo(() => {
        return {
            borderColor: themeColor,
            borderTopWidth: 2,
            borderLeftWidth: 2,
            borderRightWidth: 2,
            borderBottomWidth: 2,
            borderStyle: "solid",
        };
    }, [themeColor]);
    const elevationStyle = useMemo(() => {
        return {
            shadowColor: themeColor,
            shadowOffset: { width: 0, height: 0 },
            shadowOpacity: 0.25,
            shadowRadius: elevation,
        };
    }, [elevation, themeColor]);
    const cardStyle = useMemo(() => {
        if (variant === "elevation")
            return elevationStyle;
        if (variant === "outlined")
            return outlinedStyle;
    }, [elevationStyle, variant, outlinedStyle]);
    const containerStyle = useMemo(() => [
        computeBorderRadius(borderRadius),
        { backgroundColor },
        cardStyle,
        style,
    ], [backgroundColor, borderRadius, cardStyle, style]);
    return (_jsx(View, Object.assign({ nativeID: "card" }, props, { style: containerStyle }, { children: children })));
});
Card.displayName = "Card";
