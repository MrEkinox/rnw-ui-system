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
import dayjs from "dayjs";
import isBetweenDayJs from "dayjs/plugin/isBetween";
import { createContext, memo, useCallback, useContext, useEffect, useMemo, useState, } from "react";
import { StyleSheet, View, } from "react-native";
import { useTheme } from "../../theme";
import { Button } from "../Button";
import { CalendarDayView } from "./CalendarDay";
import { CalendarYearView } from "./CalendarYearView";
import { CalendarMonthSelector } from "./CalendarMonthSelector";
dayjs.extend(isBetweenDayJs);
const CalendarContext = createContext({
    color: "primary",
    displayedDate: new Date(),
    maxDate: dayjs().add(100, "years").toDate(),
    minDate: dayjs().subtract(100, "years").toDate(),
    onSelect: () => { },
    toggleView: () => { },
    getDateInfo: () => ({}),
    onChangeYear: () => { },
    onChangeMonth: () => { },
});
CalendarContext.displayName = "CalendarContext";
export const useCalendar = () => useContext(CalendarContext);
const MIN_DATE = dayjs().subtract(100, "years").toDate();
const MAX_DATE = dayjs().add(100, "years").toDate();
const NOW_DATE = new Date();
export const Calendar = memo((_a) => {
    var { style, onSingleChange, onRangeChange, maxDate = MAX_DATE, minDate = MIN_DATE, value, headerStyle, endDate, interactive, mode = "single", startDate, color = "primary" } = _a, props = __rest(_a, ["style", "onSingleChange", "onRangeChange", "maxDate", "minDate", "value", "headerStyle", "endDate", "interactive", "mode", "startDate", "color"]);
    const theme = useTheme();
    const [displayedDate, setDisplayedDate] = useState(value || NOW_DATE);
    const [viewMode, setViewMode] = useState("days");
    useEffect(() => {
        const newValue = value || NOW_DATE;
        if (maxDate && dayjs(newValue).isAfter(maxDate)) {
            setDisplayedDate(maxDate);
        }
        else if (minDate && dayjs(newValue).isBefore(minDate)) {
            setDisplayedDate(minDate);
        }
        else {
            setDisplayedDate(newValue);
        }
    }, [maxDate, minDate, value]);
    useEffect(() => {
        if (mode === "single")
            return;
        const newValue = value || NOW_DATE;
        if (endDate && dayjs(newValue).isAfter(endDate)) {
            setDisplayedDate(endDate);
        }
        else if (startDate && dayjs(newValue).isBefore(startDate)) {
            setDisplayedDate(startDate);
        }
        else {
            setDisplayedDate(newValue);
        }
    }, [endDate, mode, startDate, value]);
    const toggleView = useCallback((newViewMode) => {
        setViewMode(viewMode === newViewMode ? "days" : newViewMode);
    }, [viewMode]);
    const onChangeMonth = useCallback((newDate) => {
        setDisplayedDate(newDate);
        toggleView("days");
    }, [toggleView]);
    const onChangeYear = useCallback((newDate) => {
        setDisplayedDate(newDate);
        toggleView("days");
    }, [toggleView]);
    const onSelect = useCallback((newDate) => {
        if (mode === "range") {
            let newStartValue = newDate;
            let newEndValue = newDate;
            if (!startDate || !dayjs(startDate).isSame(endDate, "day")) {
                newStartValue = newDate;
                newEndValue = newDate;
            }
            else if (dayjs(newDate).isBefore(startDate)) {
                newStartValue = newDate;
                newEndValue = startDate;
            }
            else {
                newStartValue = startDate;
                newEndValue = newDate;
            }
            onRangeChange === null || onRangeChange === void 0 ? void 0 : onRangeChange(dayjs(newStartValue).set("hours", 9).toDate(), dayjs(newEndValue).set("hours", 19).toDate());
        }
        else if (mode === "single") {
            onSingleChange === null || onSingleChange === void 0 ? void 0 : onSingleChange(newDate);
        }
    }, [endDate, mode, onRangeChange, onSingleChange, startDate]);
    const getDateInfo = useCallback((curValue, type) => {
        const parsedValue = dayjs(curValue);
        const isSame = mode !== "range" && parsedValue.isSame(value, type);
        const isFirst = !!startDate && parsedValue.isSame(startDate, type);
        const isLast = endDate ? parsedValue.isSame(endDate, type) : isFirst;
        const isFirstOrLast = isFirst || isLast;
        const isBetween = !isFirstOrLast &&
            !!endDate &&
            parsedValue.isBetween(startDate, endDate);
        const selected = isSame || isBetween || isFirstOrLast;
        const disabled = props.disabled || !parsedValue.isBetween(minDate, maxDate);
        return {
            isSame,
            isFirst,
            isFirstOrLast,
            isLast,
            isBetween,
            selected,
            disabled,
        };
    }, [endDate, maxDate, minDate, mode, props.disabled, startDate, value]);
    const themeColor = theme.palette[color] || color;
    const setYearsView = useCallback(() => toggleView("years"), [toggleView]);
    const flexStyle = useMemo(() => [headerStyle, styles.flex], [headerStyle]);
    const providerValue = useMemo(() => ({
        getDateInfo,
        toggleView,
        onChangeYear,
        onChangeMonth,
        color: themeColor,
        onSelect,
        displayedDate,
        maxDate,
        minDate,
        value: value || NOW_DATE,
        disabled: props.disabled,
        mode,
        interactive,
    }), [
        mode,
        displayedDate,
        getDateInfo,
        maxDate,
        minDate,
        onChangeMonth,
        onChangeYear,
        interactive,
        onSelect,
        props.disabled,
        themeColor,
        toggleView,
        value,
    ]);
    return (_jsx(CalendarContext.Provider, Object.assign({ value: providerValue }, { children: _jsxs(View, Object.assign({}, props, { style: style }, { children: [_jsxs(View, Object.assign({ style: flexStyle }, { children: [_jsx(CalendarMonthSelector, {}), _jsx(Button, Object.assign({ onPress: setYearsView, size: "small", color: themeColor, style: styles.btn }, { children: dayjs(displayedDate).format("YYYY") }))] })), viewMode === "days" && _jsx(CalendarDayView, {}), viewMode === "years" && _jsx(CalendarYearView, {})] })) })));
});
Calendar.displayName = "Calendar";
const styles = StyleSheet.create({
    btn: {
        marginLeft: 10,
    },
    flex: {
        flexDirection: "row",
        alignItems: "center",
    },
});
