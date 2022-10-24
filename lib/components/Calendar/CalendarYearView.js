import { jsx as _jsx } from "react/jsx-runtime";
import moment from "moment";
import { memo } from "react";
import { ScrollView, StyleSheet } from "react-native";
import { useCalendar } from ".";
import { CalendarButton } from "./CalendarButton";
export const CalendarYearView = memo(() => {
    const { value, minDate, maxDate } = useCalendar();
    const yearNumber = moment(maxDate).diff(minDate, "years");
    const years = Array.from({ length: yearNumber || 1 }).map((_, yearIndex) => moment(value).set("years", (minDate?.getFullYear() || 0) + yearIndex));
    return (_jsx(ScrollView, { style: styles.scroll, contentContainerStyle: styles.container, children: years.reverse().map((year, yearIndex) => (_jsx(CalendarButton, { type: "years", value: year.toDate() }, yearIndex))) }));
});
CalendarYearView.displayName = "CalendarYearView";
const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        flexWrap: "wrap",
    },
    scroll: {
        maxHeight: 200,
        marginTop: 5,
    },
});
