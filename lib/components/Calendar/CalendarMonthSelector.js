import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { IconButton } from "../IconButton";
import { Typography } from "../Typography";
import dayjs from "dayjs";
import { memo, useCallback } from "react";
import { View, StyleSheet } from "react-native";
import { Icon } from "../Icon";
import { useCalendar } from ".";
export const CalendarMonthSelector = memo(() => {
    var _a;
    const { displayedDate, onChangeMonth, color } = useCalendar();
    const onNextMonth = useCallback(() => {
        onChangeMonth(dayjs(displayedDate).add(1, "months").toDate());
    }, [displayedDate, onChangeMonth]);
    const onPreviousMonth = useCallback(() => {
        onChangeMonth(dayjs(displayedDate).subtract(1, "months").toDate());
    }, [displayedDate, onChangeMonth]);
    const text = dayjs(displayedDate).format("MMMM");
    return (_jsxs(View, Object.assign({ style: styles.container }, { children: [_jsx(IconButton, Object.assign({ size: "small", variant: "hovered", color: color, onPress: onPreviousMonth }, { children: _jsx(Icon, { type: "Ionicons", name: "chevron-back" }) })), _jsx(Typography, Object.assign({ variant: "h6", align: "center", style: styles.text }, { children: ((_a = text.at(0)) === null || _a === void 0 ? void 0 : _a.toUpperCase()) + text.substring(1) })), _jsx(IconButton, Object.assign({ size: "small", variant: "hovered", color: color, onPress: onNextMonth }, { children: _jsx(Icon, { type: "Ionicons", name: "chevron-forward" }) }))] })));
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
