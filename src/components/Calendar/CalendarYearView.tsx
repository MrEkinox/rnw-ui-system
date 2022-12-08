import dayjs from "dayjs";
import React, { memo } from "react";
import { ScrollView, StyleSheet } from "react-native";
import { useCalendar } from ".";
import { CalendarButton } from "./CalendarButton";

export const CalendarYearView = memo(() => {
  const { value, minDate, maxDate } = useCalendar();

  const yearNumber = dayjs(maxDate).diff(minDate, "years");
  const years = Array.from({ length: yearNumber || 1 }).map((_, yearIndex) =>
    dayjs(value).set("years", (minDate?.getFullYear() || 0) + yearIndex)
  );

  return (
    <ScrollView style={styles.scroll} contentContainerStyle={styles.container}>
      {years.reverse().map((year, yearIndex) => (
        <CalendarButton type="years" value={year.toDate()} key={yearIndex} />
      ))}
    </ScrollView>
  );
});
CalendarYearView.displayName = "CalendarYearView";

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  scroll: {
    maxHeight: 250,
    marginTop: 5,
  },
});
