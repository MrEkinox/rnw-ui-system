import { jsx as _jsx } from "react/jsx-runtime";
import { Typography } from "../Typography";
import { useTheme } from "../../theme";
import { memo, useState, useEffect, useCallback, useMemo } from "react";
import ColorJS from "color";
import { Animated, StyleSheet, } from "react-native";
export const SliderThumb = memo(({ color, value, maxValue, minValue, inInteraction, step, getLabel }) => {
    const theme = useTheme();
    const borderColor = theme.palette.background.card;
    const steppedValue = Math.round(value / step) * step;
    const currentValue = inInteraction ? value : steppedValue;
    const [width, setWidth] = useState(0);
    const percent = ((currentValue - minValue) * 100) / (maxValue - minValue);
    const animatePosition = useMemo(() => new Animated.Value(percent), [percent]);
    useEffect(() => {
        if (inInteraction) {
            animatePosition.setValue(percent);
        }
        else {
            Animated.timing(animatePosition, {
                toValue: percent,
                duration: 150,
                useNativeDriver: false,
            }).start();
        }
    }, [animatePosition, inInteraction, percent]);
    const label = getLabel === null || getLabel === void 0 ? void 0 : getLabel(steppedValue);
    const fontColor = ColorJS(color).isDark() ? "#FFF" : "#000";
    const onLayout = useCallback((event) => {
        setWidth(event.nativeEvent.layout.width);
    }, []);
    const style = useMemo(() => [
        styles.container,
        {
            borderColor,
            marginLeft: -(width / 2),
            left: animatePosition.interpolate({
                inputRange: [0, 100],
                outputRange: ["0%", "100%"],
            }),
            backgroundColor: color,
        },
    ], [animatePosition, borderColor, color, width]);
    return (_jsx(Animated.View, Object.assign({ onLayout: onLayout, style: style }, { children: typeof label === "string" || typeof label === "number" ? (_jsx(Typography, Object.assign({ color: fontColor, variant: "overline", selectable: false }, { children: label }))) : (label) })));
});
SliderThumb.displayName = "SliderThumb";
const styles = StyleSheet.create({
    container: {
        borderRadius: 999,
        alignItems: "center",
        borderStyle: "solid",
        borderWidth: 2,
        padding: 5,
        justifyContent: "center",
        position: "absolute",
    },
});
