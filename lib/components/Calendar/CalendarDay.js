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
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useTheme } from "../../theme";
import dayjs from "dayjs";
import { memo, useCallback, useMemo } from "react";
import { StyleSheet, View, } from "react-native";
import ColorJS from "color";
import { useCalendar } from ".";
import { IconButton } from "../IconButton";
import { Typography } from "../Typography";
export const CalendarDay = memo((_a) => {
    var { date } = _a, props = __rest(_a, ["date"]);
    const theme = useTheme();
    const { interactive, color, onSelect, getDateInfo } = useCalendar();
    const { selected, isBetween, isFirstOrLast, isFirst, isLast, disabled } = getDateInfo(date.toDate(), "days");
    const unSelectedFontColor = theme.palette.text;
    const selectedFontColor = ColorJS(color).isDark() ? "#FFF" : "#000";
    const backgroundColor = ColorJS(color)
        .fade(isFirstOrLast || isBetween ? 0.7 : 1)
        .toString();
    const fontColor = selected && !isBetween ? selectedFontColor : unSelectedFontColor;
    const style = useMemo(() => [
        { flex: 1, marginVertical: 2, padding: "1%", backgroundColor },
        isFirst && { borderTopLeftRadius: 999, borderBottomLeftRadius: 999 },
        isLast && { borderTopRightRadius: 999, borderBottomRightRadius: 999 },
        props.style,
    ], [backgroundColor, isFirst, isLast, props.style]);
    const btnStyle = useMemo(() => ({ margin: 2, opacity: disabled ? 0.5 : 1 }), [disabled]);
    const onPress = useCallback(() => onSelect(date.toDate()), [date, onSelect]);
    return (_jsx(View, Object.assign({}, props, { style: style }, { children: _jsx(IconButton, Object.assign({ onPress: onPress, disabled: disabled, pointerEvents: interactive ? "auto" : "none", color: color, style: btnStyle, variant: selected && !isBetween ? "contained" : "hovered", fullWidth: true }, { children: _jsx(Typography, Object.assign({ color: fontColor }, { children: date.format("D") })) })) })));
});
CalendarDay.displayName = "CalendarDay";
export const CalendarDayView = memo(() => {
    const { displayedDate, color } = useCalendar();
    const daysByWeeks = useMemo(() => {
        const daysInMonth = dayjs(displayedDate).daysInMonth();
        const firstDay = dayjs(displayedDate).set("date", 0);
        const firstDayNumber = firstDay.day();
        const weekInMonth = daysInMonth / 7 + (firstDayNumber > 4 ? 2 : 1);
        return Array.from({ length: weekInMonth }).map((_, weekIndex) => {
            return Array.from({ length: 7 }).map((_2, dayIndex) => {
                const dayNumber = 7 * weekIndex + dayIndex + 1;
                return dayjs(displayedDate).set("date", dayNumber - firstDayNumber);
            });
        });
    }, [displayedDate]);
    const firstWeek = useMemo(() => daysByWeeks[0].map((day, dayIndex) => (_jsx(Typography, Object.assign({ align: "center", color: color, variant: "overline", style: styles.firstWeekText }, { children: day.format("dd") }), dayIndex))), [color, daysByWeeks]);
    return (_jsxs(View, Object.assign({ style: styles.container }, { children: [_jsx(View, Object.assign({ style: styles.firstWeek }, { children: firstWeek })), daysByWeeks.map((week, weekIndex) => (_jsx(View, Object.assign({ style: styles.dayStyle }, { children: week === null || week === void 0 ? void 0 : week.map((day, dayIndex) => (_jsx(CalendarDay, { date: day }, dayIndex))) }), weekIndex)))] })));
});
CalendarDayView.displayName = "CalendarDayView";
const styles = StyleSheet.create({
    container: { marginTop: 15 },
    firstWeek: { flexDirection: "row" },
    firstWeekText: { margin: 5, flex: 1, fontWeight: "600" },
    dayStyle: { flexDirection: "row" },
});
