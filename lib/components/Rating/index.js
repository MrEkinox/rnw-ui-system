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
import { memo, useCallback, useEffect, useMemo, useState } from "react";
import { View } from "react-native";
import { useTheme } from "../../theme";
import { RatingItem } from "./RatingItem";
export const Rating = memo((_a) => {
    var { size = 50, value = 0, onChange, touchable, spacing = 5, iconProps, color = "primary", style } = _a, props = __rest(_a, ["size", "value", "onChange", "touchable", "spacing", "iconProps", "color", "style"]);
    const theme = useTheme();
    const [currentValue, setCurrentValue] = useState(value);
    useEffect(() => {
        if (value !== currentValue)
            setCurrentValue(value);
    }, [value, currentValue]);
    const themeColor = theme.palette[color] || color;
    const disabledColor = theme.palette.disabled;
    const onChangeValue = useCallback((newValue) => {
        setCurrentValue(newValue);
        onChange === null || onChange === void 0 ? void 0 : onChange(newValue);
    }, [onChange]);
    const containerStyle = useMemo(() => [{ flexDirection: "row" }, style], [style]);
    const getStyle = useCallback((index) => ({ paddingLeft: index > 0 ? spacing : 0 }), [spacing]);
    return (_jsx(View, Object.assign({ nativeID: "rating" }, props, { style: containerStyle }, { children: Array.from({ length: 5 }).map((_, index) => (_jsx(RatingItem, { disabled: !touchable, value: index + 1, onPress: onChangeValue, iconProps: iconProps, size: size, color: currentValue >= index + 1 ? themeColor : disabledColor, style: getStyle(index) }, index))) })));
});
Rating.displayName = "Rating";
