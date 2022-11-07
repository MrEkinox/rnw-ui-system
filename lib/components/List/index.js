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
import { StyleSheet, View } from "react-native";
import { Typography } from "../Typography";
export const List = memo((_a) => {
    var { children, header, footer, hearderTextProps, footerTextProps } = _a, props = __rest(_a, ["children", "header", "footer", "hearderTextProps", "footerTextProps"]);
    const headerComponent = useMemo(() => {
        if (typeof header !== "string")
            return header;
        return (_jsx(Typography, Object.assign({ style: styles.padding, variant: "overline" }, hearderTextProps, { children: header })));
    }, [header, hearderTextProps]);
    const footerComponent = useMemo(() => {
        if (typeof footer !== "string")
            return footer;
        return (_jsx(Typography, Object.assign({ style: styles.padding, variant: "overline" }, footerTextProps, { children: footer })));
    }, [footer, footerTextProps]);
    return (_jsxs(View, Object.assign({ nativeID: "List" }, props, { children: [headerComponent, children, footerComponent] })));
});
List.displayName = "List";
const styles = StyleSheet.create({
    padding: {
        padding: 10,
    },
});
