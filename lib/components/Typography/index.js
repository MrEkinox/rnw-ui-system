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
import { useThemeStyle } from "../../hooks/useThemeStyle";
import { memo, useCallback, useMemo, useState } from "react";
import { Text, View, } from "react-native";
import { useTheme } from "../../theme";
export const Typography = memo((_a) => {
    var { children, align, gutterBottom, noWrap, variant, loading, secondary, defaultWidth, vertical, direction, color = "text" } = _a, props = __rest(_a, ["children", "align", "gutterBottom", "noWrap", "variant", "loading", "secondary", "defaultWidth", "vertical", "direction", "color"]);
    const theme = useTheme();
    const variantStyle = variant && theme.typography[variant];
    const fontSize = (variantStyle === null || variantStyle === void 0 ? void 0 : variantStyle["fontSize"]) || 1;
    const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
    const style = useThemeStyle((curTheme) => {
        const fontFamily = curTheme.typography.fontFamily;
        const fontColor = curTheme.palette[color] || color;
        const disabledColor = curTheme.palette.disabled;
        return [
            loading && {
                width: defaultWidth,
                backgroundColor: disabledColor,
                borderRadius: 5,
            },
            vertical && {
                transform: [{ rotate: direction === "ltr" ? "-90deg" : "90deg" }],
            },
            {
                textDecorationLine: "none",
                color: fontColor,
                fontFamily,
                textAlign: align,
                opacity: secondary ? 0.8 : 1,
                marginBottom: gutterBottom ? fontSize / 4 : undefined,
            },
            noWrap && {
                textOverflow: "ellipsis",
                overflow: "hidden",
                whiteSpace: "nowrap",
            },
            variantStyle,
            props.style,
        ];
    }, [
        color,
        loading,
        defaultWidth,
        vertical,
        direction,
        align,
        secondary,
        gutterBottom,
        fontSize,
        noWrap,
        variantStyle,
        props.style,
    ]);
    const onLayout = useCallback((event) => {
        const { width, height } = event.nativeEvent.layout;
        setDimensions({ width, height });
    }, []);
    const verticalStyle = useMemo(() => ({
        alignItems: "center",
        justifyContent: "center",
        width: dimensions.height || fontSize,
        height: dimensions.width || "100%",
    }), [dimensions.height, dimensions.width, fontSize]);
    if (vertical) {
        return (_jsx(View, Object.assign({ style: verticalStyle }, { children: _jsx(Text, Object.assign({ onLayout: onLayout, ellipsizeMode: noWrap ? "tail" : undefined }, props, { style: style }, { children: children || " " })) })));
    }
    return (_jsx(Text, Object.assign({ ellipsizeMode: noWrap ? "tail" : undefined }, props, { style: style }, { children: children || " " })));
});
Typography.displayName = "Typography";
