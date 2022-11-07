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
import { Button } from "../Button";
export const IconButton = memo((_a) => {
    var { size = "medium", children, style } = _a, props = __rest(_a, ["size", "children", "style"]);
    const sizeStyle = useMemo(() => {
        if (size === "large")
            return { paddingHorizontal: 15, paddingVertical: 15 };
        if (size === "small")
            return { paddingHorizontal: 8, paddingVertical: 8 };
        return { paddingHorizontal: 10, paddingVertical: 10 };
    }, [size]);
    const containerStyle = useMemo(() => [
        { aspectRatio: 1, borderRadius: 999 },
        sizeStyle,
        style,
    ], [sizeStyle, style]);
    return (_jsx(Button, Object.assign({}, props, { size: size, style: containerStyle }, { children: children })));
});
IconButton.displayName = "IconButton";
