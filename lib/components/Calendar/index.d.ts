import React from "react";
import { ViewProps } from "react-native";
import { Colors } from "../../theme";
export declare type CalendarViewType = "days" | "years" | "months";
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
    getDateInfo: (value: Date, type: CalendarViewType) => {
        isSame?: boolean;
        isFirst?: boolean;
        isLast?: boolean;
        isBetween?: boolean;
        isFirstOrLast?: boolean;
        selected?: boolean;
        disabled?: boolean;
    };
}
export declare const useCalendar: () => ContextProps;
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
}
export declare const Calendar: React.NamedExoticComponent<CalendarProps>;
export {};
