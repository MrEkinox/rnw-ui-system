"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Rating = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var react_native_1 = require("react-native");
var theme_1 = require("../../theme");
var RatingItem_1 = require("./RatingItem");
exports.Rating = (0, react_1.memo)(function (_a) {
    var _b = _a.size, size = _b === void 0 ? 50 : _b, _c = _a.value, value = _c === void 0 ? 0 : _c, onChange = _a.onChange, touchable = _a.touchable, _d = _a.spacing, spacing = _d === void 0 ? 5 : _d, iconProps = _a.iconProps, _e = _a.color, color = _e === void 0 ? "primary" : _e, style = _a.style, props = __rest(_a, ["size", "value", "onChange", "touchable", "spacing", "iconProps", "color", "style"]);
    var theme = (0, theme_1.useTheme)();
    var _f = (0, react_1.useState)(value), currentValue = _f[0], setCurrentValue = _f[1];
    (0, react_1.useEffect)(function () {
        if (value !== currentValue)
            setCurrentValue(value);
    }, [value, currentValue]);
    var themeColor = theme.palette[color] || color;
    var disabledColor = theme.palette.disabled;
    var onChangeValue = (0, react_1.useCallback)(function (newValue) {
        setCurrentValue(newValue);
        onChange === null || onChange === void 0 ? void 0 : onChange(newValue);
    }, [onChange]);
    var containerStyle = (0, react_1.useMemo)(function () { return [{ flexDirection: "row" }, style]; }, [style]);
    var getStyle = (0, react_1.useCallback)(function (index) { return ({ paddingLeft: index > 0 ? spacing : 0 }); }, [spacing]);
    return ((0, jsx_runtime_1.jsx)(react_native_1.View, __assign({ nativeID: "rating" }, props, { style: containerStyle }, { children: Array.from({ length: 5 }).map(function (_, index) { return ((0, jsx_runtime_1.jsx)(RatingItem_1.RatingItem, { disabled: !touchable, value: index + 1, onPress: onChangeValue, iconProps: iconProps, size: size, color: currentValue >= index + 1 ? themeColor : disabledColor, style: getStyle(index) }, index)); }) })));
});
exports.Rating.displayName = "Rating";
