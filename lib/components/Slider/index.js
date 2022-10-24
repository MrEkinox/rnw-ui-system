"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Slider = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const react_native_1 = require("react-native");
const theme_1 = require("../../theme");
const color_1 = __importDefault(require("color"));
const useScrollLock_1 = require("../../hooks/useScrollLock");
const SliderThumb_1 = require("./SliderThumb");
const SliderStepDots_1 = require("./SliderStepDots");
const SliderTrack_1 = require("./SliderTrack");
exports.Slider = (0, react_1.memo)(({ color = "primary", value, maxValue, minValue, step = 1, disabled, marks, track = true, getLabel, onChange, style, ...props }) => {
    const theme = (0, theme_1.useTheme)();
    const borderRadius = theme.borderRadius;
    const disabledColor = theme.palette.disabled;
    const themeColor = disabled
        ? disabledColor
        : theme.palette[color] || color;
    const containerRef = (0, react_1.useRef)(null);
    const { setScrollLocked } = (0, useScrollLock_1.useScrollLock)();
    const [interactionIndex, setInteractionIndex] = (0, react_1.useState)(-1);
    const [currentValues, setValues] = (0, react_1.useState)([]);
    (0, react_1.useEffect)(() => {
        const arrayValues = (typeof value === "number" ? [value] : value).map((curValue) => curValue < minValue || curValue > maxValue ? minValue : curValue);
        setValues(arrayValues);
    }, [maxValue, minValue, value]);
    const getInteractiveThumb = (0, react_1.useCallback)((newValue) => currentValues.reduce((acc, cValue, index) => {
        if (Math.abs(cValue - newValue) < Math.abs(acc.value - newValue))
            return { index, value: cValue };
        return acc;
    }, { index: 0, value: 0 }), [currentValues]);
    const onMoveEnd = (0, react_1.useCallback)(() => {
        setInteractionIndex(-1);
        const steppedCurrendValues = currentValues.map((cValue) => Math.round(cValue / step) * step);
        if (typeof value === "number") {
            onChange(steppedCurrendValues[0]);
        }
        else
            onChange(steppedCurrendValues);
    }, [currentValues, onChange, step, value]);
    const onMove = (0, react_1.useCallback)((_, { moveX, x0 }) => {
        containerRef.current?.measureInWindow((containerPositionX, y, width) => {
            const x = (moveX || x0) - containerPositionX;
            let newValue = minValue + ((maxValue - minValue) * x) / width;
            if (newValue < minValue) {
                newValue = minValue;
            }
            else if (newValue > maxValue) {
                newValue = maxValue;
            }
            const interactiveThumb = getInteractiveThumb(newValue);
            setInteractionIndex(interactiveThumb.index);
            setValues((curValues) => curValues.map((cValue, index) => index === interactiveThumb.index ? newValue : cValue));
        });
    }, [getInteractiveThumb, maxValue, minValue]);
    const panResponder = (0, react_1.useMemo)(() => react_native_1.PanResponder.create({
        onStartShouldSetPanResponder: () => disabled !== true,
        onMoveShouldSetPanResponder: () => disabled !== true,
        onPanResponderTerminationRequest: () => false,
        onPanResponderGrant: onMove,
        onPanResponderEnd: onMoveEnd,
        onPanResponderMove: onMove,
    }), [disabled, onMove, onMoveEnd]);
    (0, react_1.useEffect)(() => {
        setScrollLocked(interactionIndex !== -1);
    }, [interactionIndex, setScrollLocked]);
    const containerStyle = (0, react_1.useMemo)(() => [
        {
            borderRadius,
            backgroundColor: (0, color_1.default)(themeColor).fade(0.5).toString(),
            height: 10,
            width: "100%",
            // @ts-ignore
            cursor: disabled ? undefined : "pointer",
            justifyContent: "center",
        },
        style,
    ], [borderRadius, disabled, style, themeColor]);
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { ref: containerRef, ...props, style: containerStyle, ...panResponder.panHandlers, children: [track && ((0, jsx_runtime_1.jsx)(SliderTrack_1.SliderTrack, { color: themeColor, minValue: minValue, maxValue: maxValue, inInteraction: interactionIndex !== -1, values: currentValues, step: step })), marks && ((0, jsx_runtime_1.jsx)(SliderStepDots_1.SliderStepDots, { minValue: minValue, maxValue: maxValue, step: step })), currentValues.map((cValue, index) => ((0, jsx_runtime_1.jsx)(SliderThumb_1.SliderThumb, { getLabel: getLabel, inInteraction: interactionIndex === index, color: themeColor, minValue: minValue, maxValue: maxValue, value: cValue, step: step }, index)))] }));
});
exports.Slider.displayName = "Slider";
