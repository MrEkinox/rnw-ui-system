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
import { Typography } from "../Typography";
import { View } from "react-native";
import { memo, useMemo } from "react";
export const ListItemText = memo((_a) => {
    var { primary, primaryProps, secondary, primaryVariant = "body1", secondaryVariant = "body2", secondaryProps, noWrap, loading } = _a, props = __rest(_a, ["primary", "primaryProps", "secondary", "primaryVariant", "secondaryVariant", "secondaryProps", "noWrap", "loading"]);
    const containerStyle = useMemo(() => [{ flex: 1 }, props.style], [props.style]);
    return (_jsxs(View, Object.assign({}, props, { style: containerStyle }, { children: [primary && (_jsx(Typography, Object.assign({ variant: primaryVariant, noWrap: noWrap, gutterBottom: !!secondary, loading: loading, width: 150 }, primaryProps, { children: primary }))), secondary && (_jsx(Typography, Object.assign({ variant: secondaryVariant, noWrap: noWrap, secondary: true, loading: loading, width: 200 }, secondaryProps, { children: secondary })))] })));
});
