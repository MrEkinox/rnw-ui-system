import { jsx as _jsx } from "react/jsx-runtime";
import { Button } from "../Button";
import { Typography } from "../Typography";
import { useTheme } from "../../theme";
import moment from "moment";
import { memo, useCallback, useMemo } from "react";
import ColorJS from "color";
import { View, StyleSheet } from "react-native";
import { useCalendar } from ".";
export const CalendarButton = memo(({ value, type }) => {
    const theme = useTheme();
    const { color, getDateInfo, onChangeYear } = useCalendar();
    const borderRadius = theme.borderRadius / 1.5;
    const selectedFontColor = ColorJS(color).isDark() ? "#FFF" : "#000";
    const unSelectedFontColor = theme.palette.text;
    const { selected, isBetween, isFirst, isLast, disabled } = getDateInfo(value, type);
    const backgroundColor = ColorJS(color)
        .fade(selected || isBetween ? 0.7 : 1)
        .toString();
    const fontColor = selected ? selectedFontColor : unSelectedFontColor;
    const format = type === "years" ? "YYYY" : "MMMM";
    const containerStyle = useMemo(() => [
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
    ], [backgroundColor, borderRadius, isFirst, isLast]);
    const textStyle = useMemo(() => ({ opacity: disabled ? 0.5 : 1 }), [disabled]);
    const onClick = useCallback(() => onChangeYear(value), [onChangeYear, value]);
    return (_jsx(View, { style: containerStyle, children: _jsx(Button, { onPress: onClick, disabled: disabled, fullWidth: true, style: styles.btn, variant: selected ? "contained" : "hovered", color: color, children: _jsx(Typography, { color: fontColor, style: textStyle, children: moment(value).format(format) }) }) }));
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
