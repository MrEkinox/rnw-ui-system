var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { memo, useCallback, useEffect, useMemo, useRef, useState, } from "react";
import { PanResponder, View, } from "react-native";
import { useTheme } from "../../theme";
import ColorJS from "color";
import { useScrollLock } from "../../hooks/useScrollLock";
import { SliderThumb } from "./SliderThumb";
import { SliderStepDots } from "./SliderStepDots";
import { SliderTrack } from "./SliderTrack";
export const Slider = memo((_a) => {
    var { color = "primary", value, maxValue, minValue, step = 1, disabled, marks, track = true, getLabel, onChange, style } = _a, props = __rest(_a, ["color", "value", "maxValue", "minValue", "step", "disabled", "marks", "track", "getLabel", "onChange", "style"]);
    const theme = useTheme();
    const borderRadius = theme.borderRadius;
    const disabledColor = theme.palette.disabled;
    const themeColor = disabled
        ? disabledColor
        : theme.palette[color] || color;
    const containerRef = useRef(null);
    const { setScrollLocked } = useScrollLock();
    const [interactionIndex, setInteractionIndex] = useState(-1);
    const [currentValues, setValues] = useState([]);
    useEffect(() => {
        const arrayValues = (typeof value === "number" ? [value] : value).map((curValue) => curValue < minValue || curValue > maxValue ? minValue : curValue);
        setValues(arrayValues);
    }, [maxValue, minValue, value]);
    const getInteractiveThumb = useCallback((newValue) => currentValues.reduce((acc, cValue, index) => {
        if (Math.abs(cValue - newValue) < Math.abs(acc.value - newValue))
            return { index, value: cValue };
        return acc;
    }, { index: 0, value: 0 }), [currentValues]);
    const onMoveEnd = useCallback(() => {
        setInteractionIndex(-1);
        const steppedCurrendValues = currentValues.map((cValue) => Math.round(cValue / step) * step);
        if (typeof value === "number") {
            onChange(steppedCurrendValues[0]);
        }
        else
            onChange(steppedCurrendValues);
    }, [currentValues, onChange, step, value]);
    const onMove = useCallback((_, { moveX, x0 }) => {
        var _a;
        (_a = containerRef.current) === null || _a === void 0 ? void 0 : _a.measureInWindow((containerPositionX, y, width) => {
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
    const panResponder = useMemo(() => PanResponder.create({
        onStartShouldSetPanResponder: () => disabled !== true,
        onMoveShouldSetPanResponder: () => disabled !== true,
        onPanResponderTerminationRequest: () => false,
        onPanResponderGrant: onMove,
        onPanResponderEnd: onMoveEnd,
        onPanResponderMove: onMove,
    }), [disabled, onMove, onMoveEnd]);
    useEffect(() => {
        setScrollLocked(interactionIndex !== -1);
    }, [interactionIndex, setScrollLocked]);
    const containerStyle = useMemo(() => [
        {
            borderRadius,
            backgroundColor: ColorJS(themeColor).fade(0.5).toString(),
            height: 10,
            width: "100%",
            // @ts-ignore
            cursor: disabled ? undefined : "pointer",
            justifyContent: "center",
        },
        style,
    ], [borderRadius, disabled, style, themeColor]);
    return (_jsxs(View, Object.assign({ ref: containerRef }, props, { style: containerStyle }, panResponder.panHandlers, { children: [track && (_jsx(SliderTrack, { color: themeColor, minValue: minValue, maxValue: maxValue, inInteraction: interactionIndex !== -1, values: currentValues, step: step })), marks && (_jsx(SliderStepDots, { minValue: minValue, maxValue: maxValue, step: step })), currentValues.map((cValue, index) => (_jsx(SliderThumb, { getLabel: getLabel, inInteraction: interactionIndex === index, color: themeColor, minValue: minValue, maxValue: maxValue, value: cValue, step: step }, index)))] })));
});
Slider.displayName = "Slider";
