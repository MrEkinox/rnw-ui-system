import { Dayjs } from "dayjs";
import React from "react";
import { ViewProps } from "react-native";
export interface CalendarDayProps extends ViewProps {
    date: Dayjs;
}
export declare const CalendarDay: React.NamedExoticComponent<CalendarDayProps>;
export declare const CalendarDayView: React.MemoExoticComponent<() => JSX.Element>;
