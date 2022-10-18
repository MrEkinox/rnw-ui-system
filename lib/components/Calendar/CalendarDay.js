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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CalendarDayView = exports.CalendarDay = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
var theme_1 = require("../../theme");
var react_1 = require("react");
var react_native_1 = require("react-native");
var color_1 = __importDefault(require("color"));
var _1 = require(".");
var IconButton_1 = require("../IconButton");
var Typography_1 = require("../Typography");
var moment_1 = __importDefault(require("moment"));
exports.CalendarDay = (0, react_1.memo)(function (_a) {
    var date = _a.date, props = __rest(_a, ["date"]);
    var theme = (0, theme_1.useTheme)();
    var _b = (0, _1.useCalendar)(), interactive = _b.interactive, color = _b.color, onSelect = _b.onSelect, getDateInfo = _b.getDateInfo;
    var _c = getDateInfo(date.toDate(), "days"), selected = _c.selected, isBetween = _c.isBetween, isFirstOrLast = _c.isFirstOrLast, isFirst = _c.isFirst, isLast = _c.isLast, disabled = _c.disabled;
    var unSelectedFontColor = theme.palette.text;
    var selectedFontColor = (0, color_1.default)(color).isDark() ? "#FFF" : "#000";
    var backgroundColor = (0, color_1.default)(color)
        .fade(isFirstOrLast || isBetween ? 0.7 : 1)
        .toString();
    var fontColor = selected && !isBetween ? selectedFontColor : unSelectedFontColor;
    var style = (0, react_1.useMemo)(function () { return [
        { flex: 1, marginVertical: 2, padding: "1%", backgroundColor: backgroundColor },
        isFirst && { borderTopLeftRadius: 999, borderBottomLeftRadius: 999 },
        isLast && { borderTopRightRadius: 999, borderBottomRightRadius: 999 },
        props.style,
    ]; }, [backgroundColor, isFirst, isLast, props.style]);
    var btnStyle = (0, react_1.useMemo)(function () { return ({ margin: 2, opacity: disabled ? 0.5 : 1 }); }, [disabled]);
    var onPress = (0, react_1.useCallback)(function () { return onSelect(date.toDate()); }, [date, onSelect]);
    return ((0, jsx_runtime_1.jsx)(react_native_1.View, __assign({}, props, { style: style }, { children: (0, jsx_runtime_1.jsx)(IconButton_1.IconButton, __assign({ onPress: onPress, disabled: disabled, pointerEvents: interactive ? "auto" : "none", color: color, style: btnStyle, variant: selected && !isBetween ? "contained" : "hovered", fullWidth: true }, { children: (0, jsx_runtime_1.jsx)(Typography_1.Typography, __assign({ color: fontColor }, { children: date.format("D") })) })) })));
});
exports.CalendarDay.displayName = "CalendarDay";
exports.CalendarDayView = (0, react_1.memo)(function () {
    var _a = (0, _1.useCalendar)(), displayedDate = _a.displayedDate, color = _a.color;
    var daysByWeeks = (0, react_1.useMemo)(function () {
        var daysInMonth = (0, moment_1.default)(displayedDate).daysInMonth();
        var firstDay = (0, moment_1.default)(displayedDate).set("date", 0);
        var firstDayNumber = firstDay.get("E");
        var weekInMonth = daysInMonth / 7 + (firstDayNumber > 4 ? 2 : 1);
        return Array.from({ length: weekInMonth }).map(function (_, weekIndex) {
            return Array.from({ length: 7 }).map(function (_2, dayIndex) {
                var dayNumber = 7 * weekIndex + dayIndex + 1;
                return (0, moment_1.default)(displayedDate).set("date", dayNumber - firstDayNumber);
            });
        });
    }, [displayedDate]);
    var firstWeek = (0, react_1.useMemo)(function () {
        return daysByWeeks[0].map(function (day, dayIndex) { return ((0, jsx_runtime_1.jsx)(Typography_1.Typography, __assign({ align: "center", color: color, variant: "overline", style: styles.firstWeekText }, { children: day.format("dd") }), dayIndex)); });
    }, [color, daysByWeeks]);
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, __assign({ style: styles.container }, { children: [(0, jsx_runtime_1.jsx)(react_native_1.View, __assign({ style: styles.firstWeek }, { children: firstWeek })), daysByWeeks.map(function (week, weekIndex) { return ((0, jsx_runtime_1.jsx)(react_native_1.View, __assign({ style: styles.dayStyle }, { children: week === null || week === void 0 ? void 0 : week.map(function (day, dayIndex) { return ((0, jsx_runtime_1.jsx)(exports.CalendarDay, { date: day }, dayIndex)); }) }), weekIndex)); })] })));
});
exports.CalendarDayView.displayName = "CalendarDayView";
var styles = react_native_1.StyleSheet.create({
    container: { marginTop: 15 },
    firstWeek: { flexDirection: "row" },
    firstWeekText: { margin: 5, flex: 1, fontWeight: "600" },
    dayStyle: { flexDirection: "row" },
});
