import dayjs from "dayjs";
import isBetweenDayJs from "dayjs/plugin/isBetween";
import React, {
  createContext,
  memo,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  StyleProp,
  StyleSheet,
  View,
  ViewProps,
  ViewStyle,
} from "react-native";
import { Colors, useTheme } from "../../theme";
import { Button } from "../Button";
import { CalendarDayView } from "./CalendarDay";
import { CalendarYearView } from "./CalendarYearView";
import { CalendarMonthSelector } from "./CalendarMonthSelector";

dayjs.extend(isBetweenDayJs);

export type CalendarViewType = "days" | "years" | "months";

interface ContextProps {
  displayedDate: Date;
  value?: Date | null;
  maxDate: Date | null;
  minDate: Date | null;
  color: Colors;
  mode?: "range" | "single";
  disabled?: boolean;
  interactive?: boolean;
  onChangeMonth: (newDate: Date) => void;
  onChangeYear: (newDate: Date) => void;
  onSelect: (newDate: Date) => void;
  toggleView: (type: CalendarViewType) => void;
  getDateInfo: (
    value: Date,
    type: CalendarViewType
  ) => {
    isSame?: boolean;
    isFirst?: boolean;
    isLast?: boolean;
    isBetween?: boolean;
    isFirstOrLast?: boolean;
    selected?: boolean;
    disabled?: boolean;
  };
}

const CalendarContext = createContext<ContextProps>({
  color: "primary",
  displayedDate: new Date(),
  maxDate: dayjs().add(100, "years").toDate(),
  minDate: dayjs().subtract(100, "years").toDate(),
  onSelect: () => {},
  toggleView: () => {},
  getDateInfo: () => ({}),
  onChangeYear: () => {},
  onChangeMonth: () => {},
});
CalendarContext.displayName = "CalendarContext";

export const useCalendar = () => useContext(CalendarContext);

export interface CalendarProps extends ViewProps {
  value?: Date | null;
  maxDate?: Date | null;
  minDate?: Date | null;
  startDate?: Date | null;
  endDate?: Date | null;
  disabled?: boolean;
  interactive?: boolean;
  mode?: "range" | "single";
  onSingleChange?: (newValue?: Date) => void;
  onRangeChange?: (newStartValue: Date, newEndValue: Date) => void;
  color?: Colors;
  headerStyle?: StyleProp<ViewStyle>;
}

const MIN_DATE = dayjs().subtract(100, "years").toDate();
const MAX_DATE = dayjs().add(100, "years").toDate();
const NOW_DATE = new Date();

export const Calendar = memo<CalendarProps>(
  ({
    style,
    onSingleChange,
    onRangeChange,
    maxDate = MAX_DATE,
    minDate = MIN_DATE,
    value,
    headerStyle,
    endDate,
    interactive,
    mode = "single",
    startDate,
    color = "primary",
    ...props
  }) => {
    const theme = useTheme();
    const [displayedDate, setDisplayedDate] = useState(value || NOW_DATE);
    const [viewMode, setViewMode] = useState<CalendarViewType>("days");

    useEffect(() => {
      const newValue = value || NOW_DATE;
      if (maxDate && dayjs(newValue).isAfter(maxDate)) {
        setDisplayedDate(maxDate);
      } else if (minDate && dayjs(newValue).isBefore(minDate)) {
        setDisplayedDate(minDate);
      } else {
        setDisplayedDate(newValue);
      }
    }, [maxDate, minDate, value]);

    useEffect(() => {
      if (mode === "single") return;
      const newValue = value || NOW_DATE;
      if (endDate && dayjs(newValue).isAfter(endDate)) {
        setDisplayedDate(endDate);
      } else if (startDate && dayjs(newValue).isBefore(startDate)) {
        setDisplayedDate(startDate);
      } else {
        setDisplayedDate(newValue);
      }
    }, [endDate, mode, startDate, value]);

    const toggleView = useCallback(
      (newViewMode: typeof viewMode) => {
        setViewMode(viewMode === newViewMode ? "days" : newViewMode);
      },
      [viewMode]
    );

    const onChangeMonth = useCallback(
      (newDate: Date) => {
        setDisplayedDate(newDate);
        toggleView("days");
      },
      [toggleView]
    );

    const onChangeYear = useCallback(
      (newDate: Date) => {
        setDisplayedDate(newDate);
        toggleView("days");
      },
      [toggleView]
    );

    const onSelect = useCallback(
      (newDate: Date) => {
        if (mode === "range") {
          let newStartValue = newDate;
          let newEndValue = newDate;
          if (!startDate || !dayjs(startDate).isSame(endDate, "day")) {
            newStartValue = newDate;
            newEndValue = newDate;
          } else if (dayjs(newDate).isBefore(startDate)) {
            newStartValue = newDate;
            newEndValue = startDate;
          } else {
            newStartValue = startDate;
            newEndValue = newDate;
          }
          onRangeChange?.(
            dayjs(newStartValue).set("hours", 9).toDate(),
            dayjs(newEndValue).set("hours", 19).toDate()
          );
        } else if (mode === "single") {
          onSingleChange?.(newDate);
        }
      },
      [endDate, mode, onRangeChange, onSingleChange, startDate]
    );

    const getDateInfo = useCallback(
      (curValue: Date, type: CalendarViewType) => {
        const parsedValue = dayjs(curValue);
        const isSame = mode !== "range" && parsedValue.isSame(value, type);
        const isFirst = !!startDate && parsedValue.isSame(startDate, type);
        const isLast = endDate ? parsedValue.isSame(endDate, type) : isFirst;
        const isFirstOrLast = isFirst || isLast;
        const isBetween =
          !isFirstOrLast &&
          !!endDate &&
          parsedValue.isBetween(startDate, endDate);

        const selected = isSame || isBetween || isFirstOrLast;
        const disabled =
          props.disabled || !parsedValue.isBetween(minDate, maxDate);

        return {
          isSame,
          isFirst,
          isFirstOrLast,
          isLast,
          isBetween,
          selected,
          disabled,
        };
      },
      [endDate, maxDate, minDate, mode, props.disabled, startDate, value]
    );

    const themeColor = theme.palette[color] || color;

    const setYearsView = useCallback(() => toggleView("years"), [toggleView]);

    const flexStyle: StyleProp<ViewStyle> = useMemo(
      () => [headerStyle, styles.flex],
      [headerStyle]
    );

    const providerValue: ContextProps = useMemo(
      () => ({
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
      }),
      [
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
      ]
    );

    return (
      <CalendarContext.Provider value={providerValue}>
        <View {...props} style={style}>
          <View style={flexStyle}>
            <CalendarMonthSelector />
            <Button
              onPress={setYearsView}
              size="small"
              color={themeColor}
              style={styles.btn}
            >
              {dayjs(displayedDate).format("YYYY")}
            </Button>
          </View>
          {viewMode === "days" && <CalendarDayView />}
          {viewMode === "years" && <CalendarYearView />}
        </View>
      </CalendarContext.Provider>
    );
  }
);
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
