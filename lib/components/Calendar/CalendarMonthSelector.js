import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { IconButton } from "../IconButton";
import { Typography } from "../Typography";
import moment from "moment";
import { memo, useCallback } from "react";
import { View, StyleSheet } from "react-native";
import { Icon } from "../Icon";
import { useCalendar } from ".";
export const CalendarMonthSelector = memo(() => {
    const { displayedDate, onChangeMonth, color } = useCalendar();
    const onNextMonth = useCallback(() => {
        onChangeMonth(moment(displayedDate).add(1, "months").toDate());
    }, [displayedDate, onChangeMonth]);
    const onPreviousMonth = useCallback(() => {
        onChangeMonth(moment(displayedDate).subtract(1, "months").toDate());
    }, [displayedDate, onChangeMonth]);
    const text = moment(displayedDate).format("MMMM");
    return (_jsxs(View, { style: styles.container, children: [_jsx(IconButton, { size: "small", variant: "hovered", color: color, onPress: onPreviousMonth, children: _jsx(Icon, { type: "Ionicons", name: "chevron-back" }) }), _jsx(Typography, { variant: "h6", align: "center", style: styles.text, children: text.at(0)?.toUpperCase() + text.substring(1) }), _jsx(IconButton, { size: "small", variant: "hovered", color: color, onPress: onNextMonth, children: _jsx(Icon, { type: "Ionicons", name: "chevron-forward" }) })] }));
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
