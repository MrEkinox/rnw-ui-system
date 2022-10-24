"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Rating = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const react_native_1 = require("react-native");
const theme_1 = require("../../theme");
const RatingItem_1 = require("./RatingItem");
exports.Rating = (0, react_1.memo)(({ size = 50, value = 0, onChange, touchable, spacing = 5, iconProps, color = "primary", style, ...props }) => {
    const theme = (0, theme_1.useTheme)();
    const [currentValue, setCurrentValue] = (0, react_1.useState)(value);
    (0, react_1.useEffect)(() => {
        if (value !== currentValue)
            setCurrentValue(value);
    }, [value, currentValue]);
    const themeColor = theme.palette[color] || color;
    const disabledColor = theme.palette.disabled;
    const onChangeValue = (0, react_1.useCallback)((newValue) => {
        setCurrentValue(newValue);
        onChange?.(newValue);
    }, [onChange]);
    const containerStyle = (0, react_1.useMemo)(() => [{ flexDirection: "row" }, style], [style]);
    const getStyle = (0, react_1.useCallback)((index) => ({ paddingLeft: index > 0 ? spacing : 0 }), [spacing]);
    return ((0, jsx_runtime_1.jsx)(react_native_1.View, { nativeID: "rating", ...props, style: containerStyle, children: Array.from({ length: 5 }).map((_, index) => ((0, jsx_runtime_1.jsx)(RatingItem_1.RatingItem, { disabled: !touchable, value: index + 1, onPress: onChangeValue, iconProps: iconProps, size: size, color: currentValue >= index + 1 ? themeColor : disabledColor, style: getStyle(index) }, index))) }));
});
exports.Rating.displayName = "Rating";
