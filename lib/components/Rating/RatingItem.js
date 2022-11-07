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
import { useHover } from "../../hooks/useHover";
import { memo, useMemo, useCallback } from "react";
import { Pressable } from "react-native";
import { Icon } from "../Icon";
export const RatingItem = memo((_a) => {
    var { iconProps, size, color, onPress, value } = _a, props = __rest(_a, ["iconProps", "size", "color", "onPress", "value"]);
    const hover = useHover();
    const style = useMemo(() => [
        { opacity: hover.isActive ? 0.5 : 1 },
        props.style,
    ], [hover.isActive, props.style]);
    const onClick = useCallback(() => onPress === null || onPress === void 0 ? void 0 : onPress(value), [onPress, value]);
    return (_jsx(Pressable, Object.assign({ onPress: onClick }, hover.handlers, props, { style: style }, { children: _jsx(Icon, Object.assign({ type: "Ionicons", name: "ios-star", color: color, size: size }, iconProps)) })));
});
RatingItem.displayName = "RatingItem";
