"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SliderThumb = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
var Typography_1 = require("../Typography");
var theme_1 = require("../../theme");
var react_1 = require("react");
var color_1 = __importDefault(require("color"));
var react_native_1 = require("react-native");
exports.SliderThumb = (0, react_1.memo)(function (_a) {
    var color = _a.color, value = _a.value, maxValue = _a.maxValue, minValue = _a.minValue, inInteraction = _a.inInteraction, step = _a.step, getLabel = _a.getLabel;
    var theme = (0, theme_1.useTheme)();
    var borderColor = theme.palette.background.card;
    var steppedValue = Math.round(value / step) * step;
    var currentValue = inInteraction ? value : steppedValue;
    var _b = (0, react_1.useState)(0), width = _b[0], setWidth = _b[1];
    var percent = ((currentValue - minValue) * 100) / (maxValue - minValue);
    var animatePosition = (0, react_1.useMemo)(function () { return new react_native_1.Animated.Value(percent); }, [percent]);
    (0, react_1.useEffect)(function () {
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
    var label = getLabel === null || getLabel === void 0 ? void 0 : getLabel(steppedValue);
    var fontColor = (0, color_1.default)(color).isDark() ? "#FFF" : "#000";
    var onLayout = (0, react_1.useCallback)(function (event) {
        setWidth(event.nativeEvent.layout.width);
    }, []);
    var style = (0, react_1.useMemo)(function () { return [
        styles.container,
        {
            borderColor: borderColor,
            marginLeft: -(width / 2),
            left: animatePosition.interpolate({
                inputRange: [0, 100],
                outputRange: ["0%", "100%"],
            }),
            backgroundColor: color,
        },
    ]; }, [animatePosition, borderColor, color, width]);
    return ((0, jsx_runtime_1.jsx)(react_native_1.Animated.View, __assign({ onLayout: onLayout, style: style }, { children: typeof label === "string" || typeof label === "number" ? ((0, jsx_runtime_1.jsx)(Typography_1.Typography, __assign({ color: fontColor, variant: "overline", selectable: false }, { children: label }))) : (label) })));
});
exports.SliderThumb.displayName = "SliderThumb";
var styles = react_native_1.StyleSheet.create({
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
