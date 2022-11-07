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
import { StyleSheet, View, } from "react-native";
import { useTheme } from "../../theme";
export const Divider = memo((_a) => {
    var { orientation, variant, style, color = "divider" } = _a, props = __rest(_a, ["orientation", "variant", "style", "color"]);
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
    return _jsx(View, Object.assign({}, props, { style: containerStyle }));
});
Divider.displayName = "Divider";
