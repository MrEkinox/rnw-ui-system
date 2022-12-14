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
import { memo, useCallback, useMemo, useState } from "react";
import { Svg, Path, G } from "react-native-svg";
import { StyleSheet, View, } from "react-native";
import { useTheme } from "../../theme";
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
export const CircularProgress = memo((_a) => {
    var { value = 50, color = "primary", lineCap = "round", strokeWidth = 10, maxValue = 100, children } = _a, props = __rest(_a, ["value", "color", "lineCap", "strokeWidth", "maxValue", "children"]);
    const theme = useTheme();
    const themeColor = theme.palette[color] || color;
    const disabledColor = theme.palette.disabled;
    const [width, setWidth] = useState(0);
    const clampFill = Math.min(100, Math.max(0, value));
    const currentFillAngle = (360 * clampFill) / maxValue;
    const backgroundCirclePath = useMemo(() => createCirclePath(width / 2, width / 2, width / 2 - strokeWidth, 0, 360), [strokeWidth, width]);
    const fillCirclePath = useMemo(() => createCirclePath(width / 2, width / 2, width / 2 - strokeWidth, 0, currentFillAngle), [currentFillAngle, strokeWidth, width]);
    const contentStyle = useMemo(() => [styles.container, { padding: strokeWidth * 2 }], [strokeWidth]);
    const onLayout = useCallback((event) => {
        setWidth(event.nativeEvent.layout.width);
    }, []);
    return (_jsxs(View, Object.assign({ nativeID: "circularProgress" }, props, { onLayout: onLayout }, { children: [_jsx(Svg, Object.assign({ width: width, height: width }, { children: _jsxs(G, { children: [_jsx(Path, { d: backgroundCirclePath, stroke: disabledColor, strokeWidth: strokeWidth, strokeLinecap: lineCap, fill: "transparent" }), currentFillAngle && (_jsx(Path, { d: fillCirclePath, stroke: themeColor, strokeWidth: strokeWidth, strokeLinecap: lineCap, fill: "transparent" }))] }) })), children && _jsx(View, Object.assign({ style: contentStyle }, { children: children }))] })));
});
CircularProgress.displayName = "CircularProgress";
const styles = StyleSheet.create({
    container: {
        width: "100%",
        height: "100%",
        overflow: "hidden",
        position: "absolute",
        alignItems: "center",
        justifyContent: "center",
    },
});
