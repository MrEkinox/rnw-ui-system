"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SliderThumb = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const Typography_1 = require("../Typography");
const theme_1 = require("../../theme");
const react_1 = require("react");
const color_1 = __importDefault(require("color"));
const react_native_1 = require("react-native");
exports.SliderThumb = (0, react_1.memo)(({ color, value, maxValue, minValue, inInteraction, step, getLabel }) => {
    const theme = (0, theme_1.useTheme)();
    const borderColor = theme.palette.background.card;
    const steppedValue = Math.round(value / step) * step;
    const currentValue = inInteraction ? value : steppedValue;
    const [width, setWidth] = (0, react_1.useState)(0);
    const percent = ((currentValue - minValue) * 100) / (maxValue - minValue);
    const animatePosition = (0, react_1.useMemo)(() => new react_native_1.Animated.Value(percent), [percent]);
    (0, react_1.useEffect)(() => {
        if (inInteraction) {
            animatePosition.setValue(percent);
        }
        else {
            react_native_1.Animated.timing(animatePosition, {
                toValue: percent,
                duration: 150,
                useNativeDriver: false,
            }).start();
        }
    }, [animatePosition, inInteraction, percent]);
    const label = getLabel?.(steppedValue);
    const fontColor = (0, color_1.default)(color).isDark() ? "#FFF" : "#000";
    const onLayout = (0, react_1.useCallback)((event) => {
        setWidth(event.nativeEvent.layout.width);
    }, []);
    const style = (0, react_1.useMemo)(() => [
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
    return ((0, jsx_runtime_1.jsx)(react_native_1.Animated.View, { onLayout: onLayout, style: style, children: typeof label === "string" || typeof label === "number" ? ((0, jsx_runtime_1.jsx)(Typography_1.Typography, { color: fontColor, variant: "overline", selectable: false, children: label })) : (label) }));
});
exports.SliderThumb.displayName = "SliderThumb";
const styles = react_native_1.StyleSheet.create({
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
