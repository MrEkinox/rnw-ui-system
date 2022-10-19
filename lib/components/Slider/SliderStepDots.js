import { jsx as _jsx } from "react/jsx-runtime";
import { useThemeStyle } from "../../hooks/useThemeStyle";
import { memo } from "react";
import { View, StyleSheet } from "react-native";
export const SliderStepDots = memo(({ step, maxValue }) => {
    const dotStyle = useThemeStyle((theme) => [
        styles.dot,
        { backgroundColor: theme.palette.background.card },
    ], []);
    if (!step)
        return null;
    return (_jsx(View, { style: styles.container, children: Array.from({ length: Math.round(maxValue / step) + 1 }).map((_, stepIndex) => (_jsx(View, { style: dotStyle }, stepIndex))) }));
});
SliderStepDots.displayName = "SliderStepDots";
const styles = StyleSheet.create({
    dot: {
        width: 4,
        height: 4,
        borderRadius: 999,
    },
    container: {
        flexDirection: "row",
        justifyContent: "space-between",
        position: "absolute",
        width: "100%",
        padding: 5,
    },
});
