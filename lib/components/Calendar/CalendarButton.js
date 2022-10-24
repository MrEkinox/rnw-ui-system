"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CalendarButton = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const Button_1 = require("../Button");
const Typography_1 = require("../Typography");
const theme_1 = require("../../theme");
const moment_1 = __importDefault(require("moment"));
const react_1 = require("react");
const color_1 = __importDefault(require("color"));
const react_native_1 = require("react-native");
const _1 = require(".");
exports.CalendarButton = (0, react_1.memo)(({ value, type }) => {
    const theme = (0, theme_1.useTheme)();
    const { color, getDateInfo, onChangeYear } = (0, _1.useCalendar)();
    const borderRadius = theme.borderRadius / 1.5;
    const selectedFontColor = (0, color_1.default)(color).isDark() ? "#FFF" : "#000";
    const unSelectedFontColor = theme.palette.text;
    const { selected, isBetween, isFirst, isLast, disabled } = getDateInfo(value, type);
    const backgroundColor = (0, color_1.default)(color)
        .fade(selected || isBetween ? 0.7 : 1)
        .toString();
    const fontColor = selected ? selectedFontColor : unSelectedFontColor;
    const format = type === "years" ? "YYYY" : "MMMM";
    const containerStyle = (0, react_1.useMemo)(() => [
        styles.container,
        { backgroundColor },
        isFirst && {
            borderTopLeftRadius: borderRadius,
            borderBottomLeftRadius: borderRadius,
        },
        isLast && {
            borderTopRightRadius: borderRadius,
            borderBottomRightRadius: borderRadius,
        },
    ], [backgroundColor, borderRadius, isFirst, isLast]);
    const textStyle = (0, react_1.useMemo)(() => ({ opacity: disabled ? 0.5 : 1 }), [disabled]);
    const onClick = (0, react_1.useCallback)(() => onChangeYear(value), [onChangeYear, value]);
    return ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: containerStyle, children: (0, jsx_runtime_1.jsx)(Button_1.Button, { onPress: onClick, disabled: disabled, fullWidth: true, style: styles.btn, variant: selected ? "contained" : "hovered", color: color, children: (0, jsx_runtime_1.jsx)(Typography_1.Typography, { color: fontColor, style: textStyle, children: (0, moment_1.default)(value).format(format) }) }) }));
});
exports.CalendarButton.displayName = "CalendarButton";
const styles = react_native_1.StyleSheet.create({
    container: {
        marginVertical: 2,
        flex: 1,
        minWidth: 100,
    },
    btn: {
        margin: 5,
    },
});
