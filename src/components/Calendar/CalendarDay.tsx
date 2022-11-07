import { useTheme } from "../../theme";
import dayjs, { Dayjs } from "dayjs";
import React, { memo, useCallback, useMemo } from "react";
import {
  StyleProp,
  StyleSheet,
  View,
  ViewProps,
  ViewStyle,
} from "react-native";
import ColorJS from "color";
import { useCalendar } from ".";
import { IconButton } from "../IconButton";
import { Typography } from "../Typography";

export interface CalendarDayProps extends ViewProps {
  date: Dayjs;
}

export const CalendarDay = memo<CalendarDayProps>(({ date, ...props }) => {
  const theme = useTheme();

  const { interactive, color, onSelect, getDateInfo } = useCalendar();
  const { selected, isBetween, isFirstOrLast, isFirst, isLast, disabled } =
    getDateInfo(date.toDate(), "days");

  const unSelectedFontColor = theme.palette.text;
  const selectedFontColor = ColorJS(color).isDark() ? "#FFF" : "#000";

  const backgroundColor = ColorJS(color)
    .fade(isFirstOrLast || isBetween ? 0.7 : 1)
    .toString();

  const fontColor =
    selected && !isBetween ? selectedFontColor : unSelectedFontColor;

  const style: StyleProp<ViewStyle> = useMemo(
    () => [
      { flex: 1, marginVertical: 2, padding: "1%", backgroundColor },
      isFirst && { borderTopLeftRadius: 999, borderBottomLeftRadius: 999 },
      isLast && { borderTopRightRadius: 999, borderBottomRightRadius: 999 },
      props.style,
    ],
    [backgroundColor, isFirst, isLast, props.style]
  );

  const btnStyle: StyleProp<ViewStyle> = useMemo(
    () => ({ margin: 2, opacity: disabled ? 0.5 : 1 }),
    [disabled]
  );

  const onPress = useCallback(() => onSelect(date.toDate()), [date, onSelect]);

  return (
    <View {...props} style={style}>
      <IconButton
        onPress={onPress}
        disabled={disabled}
        pointerEvents={interactive ? "auto" : "none"}
        color={color}
        style={btnStyle}
        variant={selected && !isBetween ? "contained" : "hovered"}
        fullWidth
      >
        <Typography color={fontColor}>{date.format("D")}</Typography>
      </IconButton>
    </View>
  );
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

  const firstWeek = useMemo(
    () =>
      daysByWeeks[0].map((day, dayIndex) => (
        <Typography
          key={dayIndex}
          align="center"
          color={color}
          variant="overline"
          style={styles.firstWeekText}
        >
          {day.format("dd")}
        </Typography>
      )),
    [color, daysByWeeks]
  );

  return (
    <View style={styles.container}>
      <View style={styles.firstWeek}>{firstWeek}</View>
      {daysByWeeks.map((week, weekIndex) => (
        <View key={weekIndex} style={styles.dayStyle}>
          {week?.map((day, dayIndex) => (
            <CalendarDay key={dayIndex} date={day} />
          ))}
        </View>
      ))}
    </View>
  );
});
CalendarDayView.displayName = "CalendarDayView";

const styles = StyleSheet.create({
  container: { marginTop: 15 },
  firstWeek: { flexDirection: "row" },
  firstWeekText: { margin: 5, flex: 1, fontWeight: "600" },
  dayStyle: { flexDirection: "row" },
});
