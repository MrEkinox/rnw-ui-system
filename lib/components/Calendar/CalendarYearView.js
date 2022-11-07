import { jsx as _jsx } from "react/jsx-runtime";
import dayjs from "dayjs";
import { memo } from "react";
import { ScrollView, StyleSheet } from "react-native";
import { useCalendar } from ".";
import { CalendarButton } from "./CalendarButton";
export const CalendarYearView = memo(() => {
    const { value, minDate, maxDate } = useCalendar();
    const yearNumber = dayjs(maxDate).diff(minDate, "years");
    const years = Array.from({ length: yearNumber || 1 }).map((_, yearIndex) => dayjs(value).set("years", ((minDate === null || minDate === void 0 ? void 0 : minDate.getFullYear()) || 0) + yearIndex));
    return (_jsx(ScrollView, Object.assign({ style: styles.scroll, contentContainerStyle: styles.container }, { children: years.reverse().map((year, yearIndex) => (_jsx(CalendarButton, { type: "years", value: year.toDate() }, yearIndex))) })));
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
