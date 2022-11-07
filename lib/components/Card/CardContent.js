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
export const CardContent = memo((_a) => {
    var { children, style } = _a, props = __rest(_a, ["children", "style"]);
    const containerStyle = useMemo(() => [
        {
            paddingLeft: 20,
            paddingRight: 20,
            paddingTop: 20,
            paddingBottom: 20,
        },
        style,
    ], [style]);
    return (_jsx(View, Object.assign({}, props, { style: containerStyle }, { children: children })));
});
CardContent.displayName = "CardContent";
