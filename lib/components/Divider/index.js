import { jsx as _jsx } from "react/jsx-runtime";
import { memo, useMemo } from "react";
import { StyleSheet, View, } from "react-native";
import { useTheme } from "../../theme";
export const Divider = memo(({ orientation, variant, style, color = "divider", ...props }) => {
    const theme = useTheme();
    const backgroundColor = theme.palette[color] || color;
    const size = variant === "middle" ? "80%" : "100%";
    const containerStyle = useMemo(() => [
        { backgroundColor, alignSelf: "center" },
        orientation === "vertical"
            ? { width: StyleSheet.hairlineWidth, height: size }
            : { height: StyleSheet.hairlineWidth, width: size },
        style,
    ], [backgroundColor, orientation, size, style]);
    return _jsx(View, { ...props, style: containerStyle });
});
Divider.displayName = "Divider";
