import React from "react";
import { CalendarViewType } from ".";
export interface CalendarButtonProps {
    value: Date;
    type: CalendarViewType;
}
export declare const CalendarButton: React.NamedExoticComponent<CalendarButtonProps>;
