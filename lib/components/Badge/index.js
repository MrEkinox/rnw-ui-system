import { jsx as _jsx } from "react/jsx-runtime";
import { memo, useMemo } from "react";
import { StyleSheet, View, } from "react-native";
import { useTheme } from "../../theme";
import ColorJS from "color";
import { Typography } from "../Typography";
export const Badge = memo(({ children, size = 5, color = "primary", ...props }) => {
    const theme = useTheme();
    const themeColor = theme.palette[color] || color;
    const content = useMemo(() => {
        if (typeof children === "string") {
            const fontColor = ColorJS(themeColor).isDark() ? "#FFF" : "#000";
            return _jsx(Typography, { color: fontColor, children: children });
        }
        return children;
    }, [children, themeColor]);
    const style = useMemo(() => [
        styles.container,
        { backgroundColor: themeColor, padding: size },
        props.style,
    ], [size, props.style, themeColor]);
    return (_jsx(View, { nativeID: "badge", ...props, style: style, children: content }));
});
Badge.displayName = "Badge";
const styles = StyleSheet.create({
    container: {
        borderRadius: 500,
        width: "fit-content",
    },
});
