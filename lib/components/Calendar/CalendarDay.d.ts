import { Moment } from "moment";
import React from "react";
import { ViewProps } from "react-native";
export interface CalendarDayProps extends ViewProps {
    date: Moment;
}
export declare const CalendarDay: React.NamedExoticComponent<CalendarDayProps>;
export declare const CalendarDayView: React.MemoExoticComponent<() => JSX.Element>;
