import { Button } from "../Button";
import { Typography } from "../Typography";
import { useTheme } from "../../theme";
import dayjs from "dayjs";
import React, { memo, useCallback, useMemo } from "react";
import ColorJS from "color";
import { StyleProp, ViewStyle, View, StyleSheet } from "react-native";
import { CalendarViewType, useCalendar } from ".";

export interface CalendarButtonProps {
  value: Date;
  type: CalendarViewType;
}

export const CalendarButton = memo<CalendarButtonProps>(({ value, type }) => {
  const theme = useTheme();
  const { color, getDateInfo, onChangeYear } = useCalendar();

  const borderRadius = theme.borderRadius / 1.5;
  const selectedFontColor = ColorJS(color).isDark() ? "#FFF" : "#000";
  const unSelectedFontColor = theme.palette.text;

  const { selected, isBetween, isFirst, isLast, disabled } = getDateInfo(
    value,
    type
  );

  const backgroundColor = ColorJS(color)
    .fade(selected || isBetween ? 0.7 : 1)
    .toString();

  const fontColor = selected ? selectedFontColor : unSelectedFontColor;

  const format = type === "years" ? "YYYY" : "MMMM";

  const containerStyle = useMemo(
    (): StyleProp<ViewStyle> => [
      styles.container,
      { backgroundColor },
      isFirst && {
        borderTopLeftRadius: borderRadius,
        borderBottomLeftRadius: borderRadius,
      },
      isLast && {
        borderTopRightRadius: borderRadius,
        borderBottomRightRadius: borderRadius,
      },
    ],
    [backgroundColor, borderRadius, isFirst, isLast]
  );

  const textStyle = useMemo(
    (): StyleProp<ViewStyle> => ({ opacity: disabled ? 0.5 : 1 }),
    [disabled]
  );

  const onClick = useCallback(() => onChangeYear(value), [onChangeYear, value]);

  return (
    <View style={containerStyle}>
      <Button
        onPress={onClick}
        disabled={disabled}
        fullWidth
        style={styles.btn}
        variant={selected ? "contained" : "hovered"}
        color={color}
      >
        <Typography color={fontColor} style={textStyle}>
          {dayjs(value).format(format)}
        </Typography>
      </Button>
    </View>
  );
});
CalendarButton.displayName = "CalendarButton";

const styles = StyleSheet.create({
  container: {
    marginVertical: 2,
    flex: 1,
    minWidth: 100,
  },
  btn: {
    margin: 5,
  },
});
