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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Slider = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var react_native_1 = require("react-native");
var theme_1 = require("../../theme");
var color_1 = __importDefault(require("color"));
var useScrollLock_1 = require("../../hooks/useScrollLock");
var SliderThumb_1 = require("./SliderThumb");
var SliderStepDots_1 = require("./SliderStepDots");
var SliderTrack_1 = require("./SliderTrack");
exports.Slider = (0, react_1.memo)(function (_a) {
    var _b = _a.color, color = _b === void 0 ? "primary" : _b, value = _a.value, maxValue = _a.maxValue, minValue = _a.minValue, _c = _a.step, step = _c === void 0 ? 1 : _c, disabled = _a.disabled, marks = _a.marks, _d = _a.track, track = _d === void 0 ? true : _d, getLabel = _a.getLabel, onChange = _a.onChange, style = _a.style, props = __rest(_a, ["color", "value", "maxValue", "minValue", "step", "disabled", "marks", "track", "getLabel", "onChange", "style"]);
    var theme = (0, theme_1.useTheme)();
    var borderRadius = theme.borderRadius;
    var disabledColor = theme.palette.disabled;
    var themeColor = disabled
        ? disabledColor
        : theme.palette[color] || color;
    var containerRef = (0, react_1.useRef)(null);
    var setScrollLocked = (0, useScrollLock_1.useScrollLock)().setScrollLocked;
    var _e = (0, react_1.useState)(-1), interactionIndex = _e[0], setInteractionIndex = _e[1];
    var _f = (0, react_1.useState)([]), currentValues = _f[0], setValues = _f[1];
    (0, react_1.useEffect)(function () {
        var arrayValues = (typeof value === "number" ? [value] : value).map(function (curValue) {
            return curValue < minValue || curValue > maxValue ? minValue : curValue;
        });
        setValues(arrayValues);
    }, [maxValue, minValue, value]);
    var getInteractiveThumb = (0, react_1.useCallback)(function (newValue) {
        return currentValues.reduce(function (acc, cValue, index) {
            if (Math.abs(cValue - newValue) < Math.abs(acc.value - newValue))
                return { index: index, value: cValue };
            return acc;
        }, { index: 0, value: 0 });
    }, [currentValues]);
    var onMoveEnd = (0, react_1.useCallback)(function () {
        setInteractionIndex(-1);
        var steppedCurrendValues = currentValues.map(function (cValue) { return Math.round(cValue / step) * step; });
        if (typeof value === "number") {
            onChange(steppedCurrendValues[0]);
        }
        else
            onChange(steppedCurrendValues);
    }, [currentValues, onChange, step, value]);
    var onMove = (0, react_1.useCallback)(function (_, _a) {
        var _b;
        var moveX = _a.moveX, x0 = _a.x0;
        (_b = containerRef.current) === null || _b === void 0 ? void 0 : _b.measureInWindow(function (containerPositionX, y, width) {
            var x = (moveX || x0) - containerPositionX;
            var newValue = minValue + ((maxValue - minValue) * x) / width;
            if (newValue < minValue) {
                newValue = minValue;
            }
            else if (newValue > maxValue) {
                newValue = maxValue;
            }
            var interactiveThumb = getInteractiveThumb(newValue);
            setInteractionIndex(interactiveThumb.index);
            setValues(function (curValues) {
                return curValues.map(function (cValue, index) {
                    return index === interactiveThumb.index ? newValue : cValue;
                });
            });
        });
    }, [getInteractiveThumb, maxValue, minValue]);
    var panResponder = (0, react_1.useMemo)(function () {
        return react_native_1.PanResponder.create({
            onStartShouldSetPanResponder: function () { return disabled !== true; },
            onMoveShouldSetPanResponder: function () { return disabled !== true; },
            onPanResponderTerminationRequest: function () { return false; },
            onPanResponderGrant: onMove,
            onPanResponderEnd: onMoveEnd,
            onPanResponderMove: onMove,
        });
    }, [disabled, onMove, onMoveEnd]);
    (0, react_1.useEffect)(function () {
        setScrollLocked(interactionIndex !== -1);
    }, [interactionIndex, setScrollLocked]);
    var containerStyle = (0, react_1.useMemo)(function () { return [
        {
            borderRadius: borderRadius,
            backgroundColor: (0, color_1.default)(themeColor).fade(0.5).toString(),
            height: 10,
            width: "100%",
            // @ts-ignore
            cursor: disabled ? undefined : "pointer",
            justifyContent: "center",
        },
        style,
    ]; }, [borderRadius, disabled, style, themeColor]);
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, __assign({ ref: containerRef }, props, { style: containerStyle }, panResponder.panHandlers, { children: [track && ((0, jsx_runtime_1.jsx)(SliderTrack_1.SliderTrack, { color: themeColor, minValue: minValue, maxValue: maxValue, inInteraction: interactionIndex !== -1, values: currentValues, step: step })), marks && ((0, jsx_runtime_1.jsx)(SliderStepDots_1.SliderStepDots, { minValue: minValue, maxValue: maxValue, step: step })), currentValues.map(function (cValue, index) { return ((0, jsx_runtime_1.jsx)(SliderThumb_1.SliderThumb, { getLabel: getLabel, inInteraction: interactionIndex === index, color: themeColor, minValue: minValue, maxValue: maxValue, value: cValue, step: step }, index)); })] })));
});
exports.Slider.displayName = "Slider";
