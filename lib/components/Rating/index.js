import { jsx as _jsx } from "react/jsx-runtime";
import { memo, useCallback, useEffect, useMemo, useState } from "react";
import { View } from "react-native";
import { useTheme } from "../../theme";
import { RatingItem } from "./RatingItem";
export const Rating = memo(({ size = 50, value = 0, onChange, touchable, spacing = 5, iconProps, color = "primary", style, ...props }) => {
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
        onChange?.(newValue);
    }, [onChange]);
    const containerStyle = useMemo(() => [{ flexDirection: "row" }, style], [style]);
    const getStyle = useCallback((index) => ({ paddingLeft: index > 0 ? spacing : 0 }), [spacing]);
    return (_jsx(View, { nativeID: "rating", ...props, style: containerStyle, children: Array.from({ length: 5 }).map((_, index) => (_jsx(RatingItem, { disabled: !touchable, value: index + 1, onPress: onChangeValue, iconProps: iconProps, size: size, color: currentValue >= index + 1 ? themeColor : disabledColor, style: getStyle(index) }, index))) }));
});
Rating.displayName = "Rating";
