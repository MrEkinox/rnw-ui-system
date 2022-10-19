import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import moment from "moment";
import { createContext, memo, useCallback, useContext, useEffect, useMemo, useState, } from "react";
import { StyleSheet, View, } from "react-native";
import { useTheme } from "../../theme";
import { Button } from "../Button";
import { CalendarDayView } from "./CalendarDay";
import { CalendarYearView } from "./CalendarYearView";
import { CalendarMonthSelector } from "./CalendarMonthSelector";
const CalendarContext = createContext({
    color: "primary",
    displayedDate: new Date(),
    maxDate: moment().add("100", "years").toDate(),
    minDate: moment().subtract("100", "years").toDate(),
    onSelect: () => { },
    toggleView: () => { },
    getDateInfo: () => ({}),
    onChangeYear: () => { },
    onChangeMonth: () => { },
});
CalendarContext.displayName = "CalendarContext";
export const useCalendar = () => useContext(CalendarContext);
const MIN_DATE = moment().subtract(100, "years").toDate();
const MAX_DATE = moment().add(100, "years").toDate();
const NOW_DATE = new Date();
export const Calendar = memo(({ style, onSingleChange, onRangeChange, maxDate = MAX_DATE, minDate = MIN_DATE, value, endDate, interactive, mode = "single", startDate, color = "primary", ...props }) => {
    const theme = useTheme();
    const [displayedDate, setDisplayedDate] = useState(value || NOW_DATE);
    const [viewMode, setViewMode] = useState("days");
    useEffect(() => {
        const newValue = value || NOW_DATE;
        if (maxDate && moment(newValue).isAfter(maxDate)) {
            setDisplayedDate(maxDate);
        }
        else if (minDate && moment(newValue).isBefore(minDate)) {
            setDisplayedDate(minDate);
        }
        else {
            setDisplayedDate(newValue);
        }
    }, [maxDate, minDate, value]);
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
            if (!startDate || !moment(startDate).isSame(endDate, "day")) {
                newStartValue = newDate;
                newEndValue = newDate;
            }
            else if (moment(newDate).isBefore(startDate)) {
                newStartValue = newDate;
                newEndValue = startDate;
            }
            else {
                newStartValue = startDate;
                newEndValue = newDate;
            }
            onRangeChange?.(moment(newStartValue).set("hours", 9).toDate(), moment(newEndValue).set("hours", 19).toDate());
        }
        else if (mode === "single") {
            onSingleChange?.(newDate);
        }
    }, [endDate, mode, onRangeChange, onSingleChange, startDate]);
    const getDateInfo = useCallback((curValue, type) => {
        const parsedValue = moment(curValue);
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
    const flexStyle = useMemo(() => styles.flex, []);
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
    return (_jsx(CalendarContext.Provider, { value: providerValue, children: _jsxs(View, { ...props, style: style, children: [_jsxs(View, { style: flexStyle, children: [_jsx(CalendarMonthSelector, {}), _jsx(Button, { onPress: setYearsView, size: "small", color: themeColor, style: styles.btn, children: moment(displayedDate).format("YYYY") })] }), viewMode === "days" && _jsx(CalendarDayView, {}), viewMode === "years" && _jsx(CalendarYearView, {})] }) }));
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
