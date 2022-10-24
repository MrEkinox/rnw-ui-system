"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CalendarDayView = exports.CalendarDay = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const theme_1 = require("../../theme");
const react_1 = require("react");
const react_native_1 = require("react-native");
const color_1 = __importDefault(require("color"));
const _1 = require(".");
const IconButton_1 = require("../IconButton");
const Typography_1 = require("../Typography");
const moment_1 = __importDefault(require("moment"));
exports.CalendarDay = (0, react_1.memo)(({ date, ...props }) => {
    const theme = (0, theme_1.useTheme)();
    const { interactive, color, onSelect, getDateInfo } = (0, _1.useCalendar)();
    const { selected, isBetween, isFirstOrLast, isFirst, isLast, disabled } = getDateInfo(date.toDate(), "days");
    const unSelectedFontColor = theme.palette.text;
    const selectedFontColor = (0, color_1.default)(color).isDark() ? "#FFF" : "#000";
    const backgroundColor = (0, color_1.default)(color)
        .fade(isFirstOrLast || isBetween ? 0.7 : 1)
        .toString();
    const fontColor = selected && !isBetween ? selectedFontColor : unSelectedFontColor;
    const style = (0, react_1.useMemo)(() => [
        { flex: 1, marginVertical: 2, padding: "1%", backgroundColor },
        isFirst && { borderTopLeftRadius: 999, borderBottomLeftRadius: 999 },
        isLast && { borderTopRightRadius: 999, borderBottomRightRadius: 999 },
        props.style,
    ], [backgroundColor, isFirst, isLast, props.style]);
    const btnStyle = (0, react_1.useMemo)(() => ({ margin: 2, opacity: disabled ? 0.5 : 1 }), [disabled]);
    const onPress = (0, react_1.useCallback)(() => onSelect(date.toDate()), [date, onSelect]);
    return ((0, jsx_runtime_1.jsx)(react_native_1.View, { ...props, style: style, children: (0, jsx_runtime_1.jsx)(IconButton_1.IconButton, { onPress: onPress, disabled: disabled, pointerEvents: interactive ? "auto" : "none", color: color, style: btnStyle, variant: selected && !isBetween ? "contained" : "hovered", fullWidth: true, children: (0, jsx_runtime_1.jsx)(Typography_1.Typography, { color: fontColor, children: date.format("D") }) }) }));
});
exports.CalendarDay.displayName = "CalendarDay";
exports.CalendarDayView = (0, react_1.memo)(() => {
    const { displayedDate, color } = (0, _1.useCalendar)();
    const daysByWeeks = (0, react_1.useMemo)(() => {
        const daysInMonth = (0, moment_1.default)(displayedDate).daysInMonth();
        const firstDay = (0, moment_1.default)(displayedDate).set("date", 0);
        const firstDayNumber = firstDay.get("E");
        const weekInMonth = daysInMonth / 7 + (firstDayNumber > 4 ? 2 : 1);
        return Array.from({ length: weekInMonth }).map((_, weekIndex) => {
            return Array.from({ length: 7 }).map((_2, dayIndex) => {
                const dayNumber = 7 * weekIndex + dayIndex + 1;
                return (0, moment_1.default)(displayedDate).set("date", dayNumber - firstDayNumber);
            });
        });
    }, [displayedDate]);
    const firstWeek = (0, react_1.useMemo)(() => daysByWeeks[0].map((day, dayIndex) => ((0, jsx_runtime_1.jsx)(Typography_1.Typography, { align: "center", color: color, variant: "overline", style: styles.firstWeekText, children: day.format("dd") }, dayIndex))), [color, daysByWeeks]);
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: styles.container, children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: styles.firstWeek, children: firstWeek }), daysByWeeks.map((week, weekIndex) => ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: styles.dayStyle, children: week?.map((day, dayIndex) => ((0, jsx_runtime_1.jsx)(exports.CalendarDay, { date: day }, dayIndex))) }, weekIndex)))] }));
});
exports.CalendarDayView.displayName = "CalendarDayView";
const styles = react_native_1.StyleSheet.create({
    container: { marginTop: 15 },
    firstWeek: { flexDirection: "row" },
    firstWeekText: { margin: 5, flex: 1, fontWeight: "600" },
    dayStyle: { flexDirection: "row" },
});
