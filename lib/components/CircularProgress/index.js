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
Object.defineProperty(exports, "__esModule", { value: true });
exports.CircularProgress = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var react_native_svg_1 = require("react-native-svg");
var react_native_1 = require("react-native");
var theme_1 = require("../../theme");
var polarToCartesian = function (centerX, centerY, radius, angleInDegrees) {
    var angleInRadians = ((angleInDegrees - 90) * Math.PI) / 180.0;
    return {
        x: centerX + radius * Math.cos(angleInRadians),
        y: centerY + radius * Math.sin(angleInRadians),
    };
};
var createCirclePath = function (x, y, radius, startAngle, endAngle) {
    var start = polarToCartesian(x, y, radius, endAngle * 0.9999);
    var end = polarToCartesian(x, y, radius, startAngle);
    var largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";
    var d = [
        "M",
        start.x,
        start.y,
        "A",
        radius,
        radius,
        0,
        largeArcFlag,
        0,
        end.x,
        end.y,
    ];
    return d.join(" ");
};
exports.CircularProgress = (0, react_1.memo)(function (_a) {
    var _b = _a.value, value = _b === void 0 ? 50 : _b, _c = _a.color, color = _c === void 0 ? "primary" : _c, _d = _a.lineCap, lineCap = _d === void 0 ? "round" : _d, _e = _a.strokeWidth, strokeWidth = _e === void 0 ? 10 : _e, _f = _a.maxValue, maxValue = _f === void 0 ? 100 : _f, children = _a.children, props = __rest(_a, ["value", "color", "lineCap", "strokeWidth", "maxValue", "children"]);
    var theme = (0, theme_1.useTheme)();
    var themeColor = theme.palette[color] || color;
    var disabledColor = theme.palette.disabled;
    var _g = (0, react_1.useState)(0), width = _g[0], setWidth = _g[1];
    var clampFill = Math.min(100, Math.max(0, value));
    var currentFillAngle = (360 * clampFill) / maxValue;
    var backgroundCirclePath = (0, react_1.useMemo)(function () {
        return createCirclePath(width / 2, width / 2, width / 2 - strokeWidth, 0, 360);
    }, [strokeWidth, width]);
    var fillCirclePath = (0, react_1.useMemo)(function () {
        return createCirclePath(width / 2, width / 2, width / 2 - strokeWidth, 0, currentFillAngle);
    }, [currentFillAngle, strokeWidth, width]);
    var contentStyle = (0, react_1.useMemo)(function () { return [styles.container, { padding: strokeWidth * 2 }]; }, [strokeWidth]);
    var onLayout = (0, react_1.useCallback)(function (event) {
        setWidth(event.nativeEvent.layout.width);
    }, []);
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, __assign({ nativeID: "circularProgress" }, props, { onLayout: onLayout }, { children: [(0, jsx_runtime_1.jsx)(react_native_svg_1.Svg, __assign({ width: width, height: width }, { children: (0, jsx_runtime_1.jsxs)(react_native_svg_1.G, { children: [(0, jsx_runtime_1.jsx)(react_native_svg_1.Path, { d: backgroundCirclePath, stroke: disabledColor, strokeWidth: strokeWidth, strokeLinecap: lineCap, fill: "transparent" }), currentFillAngle && ((0, jsx_runtime_1.jsx)(react_native_svg_1.Path, { d: fillCirclePath, stroke: themeColor, strokeWidth: strokeWidth, strokeLinecap: lineCap, fill: "transparent" }))] }) })), children && (0, jsx_runtime_1.jsx)(react_native_1.View, __assign({ style: contentStyle }, { children: children }))] })));
});
exports.CircularProgress.displayName = "CircularProgress";
var styles = react_native_1.StyleSheet.create({
    container: {
        width: "100%",
        height: "100%",
        overflow: "hidden",
        position: "absolute",
        alignItems: "center",
        justifyContent: "center",
    },
});
