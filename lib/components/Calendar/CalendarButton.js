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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CalendarButton = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
var Button_1 = require("../Button");
var Typography_1 = require("../Typography");
var theme_1 = require("../../theme");
var moment_1 = __importDefault(require("moment"));
var react_1 = require("react");
var color_1 = __importDefault(require("color"));
var react_native_1 = require("react-native");
var _1 = require(".");
exports.CalendarButton = (0, react_1.memo)(function (_a) {
    var value = _a.value, type = _a.type;
    var theme = (0, theme_1.useTheme)();
    var _b = (0, _1.useCalendar)(), color = _b.color, getDateInfo = _b.getDateInfo, onChangeYear = _b.onChangeYear;
    var borderRadius = theme.borderRadius / 1.5;
    var selectedFontColor = (0, color_1.default)(color).isDark() ? "#FFF" : "#000";
    var unSelectedFontColor = theme.palette.text;
    var _c = getDateInfo(value, type), selected = _c.selected, isBetween = _c.isBetween, isFirst = _c.isFirst, isLast = _c.isLast, disabled = _c.disabled;
    var backgroundColor = (0, color_1.default)(color)
        .fade(selected || isBetween ? 0.7 : 1)
        .toString();
    var fontColor = selected ? selectedFontColor : unSelectedFontColor;
    var format = type === "years" ? "YYYY" : "MMMM";
    var containerStyle = (0, react_1.useMemo)(function () { return [
        styles.container,
        { backgroundColor: backgroundColor },
        isFirst && {
            borderTopLeftRadius: borderRadius,
            borderBottomLeftRadius: borderRadius,
        },
        isLast && {
            borderTopRightRadius: borderRadius,
            borderBottomRightRadius: borderRadius,
        },
    ]; }, [backgroundColor, borderRadius, isFirst, isLast]);
    var textStyle = (0, react_1.useMemo)(function () { return ({ opacity: disabled ? 0.5 : 1 }); }, [disabled]);
    var onClick = (0, react_1.useCallback)(function () { return onChangeYear(value); }, [onChangeYear, value]);
    return ((0, jsx_runtime_1.jsx)(react_native_1.View, __assign({ style: containerStyle }, { children: (0, jsx_runtime_1.jsx)(Button_1.Button, __assign({ onPress: onClick, disabled: disabled, fullWidth: true, style: styles.btn, variant: selected ? "contained" : "hovered", color: color }, { children: (0, jsx_runtime_1.jsx)(Typography_1.Typography, __assign({ color: fontColor, style: textStyle }, { children: (0, moment_1.default)(value).format(format) })) })) })));
});
exports.CalendarButton.displayName = "CalendarButton";
var styles = react_native_1.StyleSheet.create({
    container: {
        marginVertical: 2,
        flex: 1,
        minWidth: 100,
    },
    btn: {
        margin: 5,
    },
});
