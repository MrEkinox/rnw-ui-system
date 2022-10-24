"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CircularProgress = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const react_native_svg_1 = require("react-native-svg");
const react_native_1 = require("react-native");
const theme_1 = require("../../theme");
const polarToCartesian = (centerX, centerY, radius, angleInDegrees) => {
    const angleInRadians = ((angleInDegrees - 90) * Math.PI) / 180.0;
    return {
        x: centerX + radius * Math.cos(angleInRadians),
        y: centerY + radius * Math.sin(angleInRadians),
    };
};
const createCirclePath = (x, y, radius, startAngle, endAngle) => {
    const start = polarToCartesian(x, y, radius, endAngle * 0.9999);
    const end = polarToCartesian(x, y, radius, startAngle);
    const largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";
    const d = [
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
exports.CircularProgress = (0, react_1.memo)(({ value = 50, color = "primary", lineCap = "round", strokeWidth = 10, maxValue = 100, children, ...props }) => {
    const theme = (0, theme_1.useTheme)();
    const themeColor = theme.palette[color] || color;
    const disabledColor = theme.palette.disabled;
    const [width, setWidth] = (0, react_1.useState)(0);
    const clampFill = Math.min(100, Math.max(0, value));
    const currentFillAngle = (360 * clampFill) / maxValue;
    const backgroundCirclePath = (0, react_1.useMemo)(() => createCirclePath(width / 2, width / 2, width / 2 - strokeWidth, 0, 360), [strokeWidth, width]);
    const fillCirclePath = (0, react_1.useMemo)(() => createCirclePath(width / 2, width / 2, width / 2 - strokeWidth, 0, currentFillAngle), [currentFillAngle, strokeWidth, width]);
    const contentStyle = (0, react_1.useMemo)(() => [styles.container, { padding: strokeWidth * 2 }], [strokeWidth]);
    const onLayout = (0, react_1.useCallback)((event) => {
        setWidth(event.nativeEvent.layout.width);
    }, []);
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { nativeID: "circularProgress", ...props, onLayout: onLayout, children: [(0, jsx_runtime_1.jsx)(react_native_svg_1.Svg, { width: width, height: width, children: (0, jsx_runtime_1.jsxs)(react_native_svg_1.G, { children: [(0, jsx_runtime_1.jsx)(react_native_svg_1.Path, { d: backgroundCirclePath, stroke: disabledColor, strokeWidth: strokeWidth, strokeLinecap: lineCap, fill: "transparent" }), currentFillAngle && ((0, jsx_runtime_1.jsx)(react_native_svg_1.Path, { d: fillCirclePath, stroke: themeColor, strokeWidth: strokeWidth, strokeLinecap: lineCap, fill: "transparent" }))] }) }), children && (0, jsx_runtime_1.jsx)(react_native_1.View, { style: contentStyle, children: children })] }));
});
exports.CircularProgress.displayName = "CircularProgress";
const styles = react_native_1.StyleSheet.create({
    container: {
        width: "100%",
        height: "100%",
        overflow: "hidden",
        position: "absolute",
        alignItems: "center",
        justifyContent: "center",
    },
});
