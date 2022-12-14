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
import { memo, useMemo } from "react";
import { Image, StyleSheet, View, } from "react-native";
import { useTheme } from "../../theme";
import ColorJS from "color";
import { Badge } from "../Badge";
import { Typography } from "../Typography";
import { renderChildren } from "../../utils";
const computeText = (text) => {
    if (!text.includes(" ")) {
        return text.slice(0, 2);
    }
    return text
        .split(" ")
        .splice(0, 2)
        .map((ctext) => ctext[0])
        .join("");
};
export const Avatar = memo((_a) => {
    var { children, size = 50, variant, src, color = "primary", style, isOnline } = _a, props = __rest(_a, ["children", "size", "variant", "src", "color", "style", "isOnline"]);
    const theme = useTheme();
    const borderRadius = theme.borderRadius / 1.5;
    const themeColor = theme.palette[color] || color;
    const fontSize = size / 2;
    const textStyle = useMemo(() => ({ fontSize }), [fontSize]);
    const content = useMemo(() => {
        const fontColor = ColorJS(themeColor).isDark() ? "#FFF" : "#000";
        if (typeof children === "string") {
            const text = computeText(children);
            return (_jsx(Typography, Object.assign({ color: fontColor, style: textStyle }, { children: text })));
        }
        return renderChildren(children, { color: fontColor, size: fontSize });
    }, [children, fontSize, textStyle, themeColor]);
    const variantBorderRadius = useMemo(() => {
        if (variant === "rounded")
            return borderRadius;
        if (variant === "square")
            return 0;
        return 900;
    }, [borderRadius, variant]);
    const containerStyle = useMemo(() => [
        styles.container,
        { borderRadius: variantBorderRadius, backgroundColor: themeColor },
        style,
    ], [themeColor, variantBorderRadius, style]);
    const sizeStyle = useMemo(() => [{ height: size, width: size }, style], [size, style]);
    const badgeStyle = useMemo(() => {
        if (variant === "rounded" || variant === "square")
            return { position: "absolute", top: -2, left: -2 };
        return { position: "absolute", top: 2, left: 2 };
    }, [variant]);
    const imgSrc = useMemo(() => (src ? { uri: src } : undefined), [src]);
    return (_jsxs(View, Object.assign({ nativeID: "avatar", style: sizeStyle }, { children: [_jsxs(View, Object.assign({}, props, { style: containerStyle }, { children: [src && _jsx(Image, { style: styles.img, source: imgSrc }), content] })), isOnline && _jsx(Badge, { color: "success", style: badgeStyle })] })));
});
Avatar.displayName = "Avatar";
const styles = StyleSheet.create({
    container: {
        height: "100%",
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
        overflow: "hidden",
    },
    img: {
        width: "100%",
        height: "100%",
        position: "absolute",
    },
});
