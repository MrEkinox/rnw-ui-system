import { jsx as _jsx } from "react/jsx-runtime";
import { useThemeStyle } from "../../hooks/useThemeStyle";
import { memo, useMemo } from "react";
import { Text, View } from "react-native";
import { useTheme } from "../../theme";
export const Typography = memo(({ children, align, gutterBottom, noWrap, variant, loading, secondary, defaultWidth, vertical, direction, color = "text", ...props }) => {
    const theme = useTheme();
    const variantStyle = variant && theme.typography[variant];
    const fontSize = variantStyle?.["fontSize"] || 1;
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
    const verticalStyle = useMemo(() => ({
        alignItems: "center",
        width: fontSize,
        height: "100%",
    }), [fontSize]);
    if (vertical) {
        return (_jsx(View, { style: verticalStyle, children: _jsx(Text, { ellipsizeMode: noWrap ? "tail" : undefined, ...props, style: style, children: children || " " }) }));
    }
    return (_jsx(Text, { ellipsizeMode: noWrap ? "tail" : undefined, ...props, style: style, children: children || " " }));
});
Typography.displayName = "Typography";
