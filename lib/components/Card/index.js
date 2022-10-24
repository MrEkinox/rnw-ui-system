import { jsx as _jsx } from "react/jsx-runtime";
import { memo, useMemo } from "react";
import { View } from "react-native";
import { useTheme } from "../../theme";
export const Card = memo(({ children, square, variant, elevation = 5, color = "primary", style, ...props }) => {
    const theme = useTheme();
    const borderRadius = square ? 0 : theme.borderRadius;
    const backgroundColor = theme.palette.background.card;
    const themeColor = theme.palette[color] || color;
    const outlinedStyle = useMemo(() => {
        return {
            borderColor: themeColor,
            borderWidth: 2,
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
    const containerStyle = useMemo(() => [{ borderRadius, backgroundColor }, cardStyle, style], [backgroundColor, borderRadius, cardStyle, style]);
    return (_jsx(View, { nativeID: "card", ...props, style: containerStyle, children: children }));
});
Card.displayName = "Card";
