import { IconButton } from "../IconButton";
import { Typography } from "../Typography";
import dayjs from "dayjs";
import React, { memo, useCallback } from "react";
import { View, StyleSheet } from "react-native";
import { Icon } from "../Icon";
import { useCalendar } from ".";

export const CalendarMonthSelector = memo(() => {
  const { displayedDate, onChangeMonth, color } = useCalendar();

  const onNextMonth = useCallback(() => {
    onChangeMonth(dayjs(displayedDate).add(1, "months").toDate());
  }, [displayedDate, onChangeMonth]);

  const onPreviousMonth = useCallback(() => {
    onChangeMonth(dayjs(displayedDate).subtract(1, "months").toDate());
  }, [displayedDate, onChangeMonth]);

  const text = dayjs(displayedDate).format("MMMM");

  return (
    <View style={styles.container}>
      <IconButton
        size="small"
        variant="hovered"
        color={color}
        onPress={onPreviousMonth}
      >
        <Icon type="Ionicons" name="chevron-back" />
      </IconButton>
      <Typography variant="h6" align="center" style={styles.text}>
        {text.at(0)?.toUpperCase() + text.substring(1)}
      </Typography>
      <IconButton
        size="small"
        variant="hovered"
        color={color}
        onPress={onNextMonth}
      >
        <Icon type="Ionicons" name="chevron-forward" />
      </IconButton>
    </View>
  );
});
CalendarMonthSelector.displayName = "CalendarMonthSelector";

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    flexWrap: "nowrap",
    alignItems: "center",
    flex: 1,
  },
  text: {
    flex: 1,
  },
});
