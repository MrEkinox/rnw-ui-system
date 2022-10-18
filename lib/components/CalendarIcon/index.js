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
exports.CalendarIcon = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var react_native_1 = require("react-native");
var theme_1 = require("../../theme");
var color_1 = __importDefault(require("color"));
var moment_1 = __importDefault(require("moment"));
var Typography_1 = require("../Typography");
exports.CalendarIcon = (0, react_1.memo)(function (_a) {
    var _b = _a.size, size = _b === void 0 ? 50 : _b, _c = _a.variant, variant = _c === void 0 ? "rounded" : _c, _d = _a.date, date = _d === void 0 ? new Date() : _d, _e = _a.color, color = _e === void 0 ? "primary" : _e, style = _a.style, props = __rest(_a, ["size", "variant", "date", "color", "style"]);
    var theme = (0, theme_1.useTheme)();
    var backgroundColor = theme.palette.background.default;
    var primaryFontColor = theme.palette.text;
    var themeColor = theme.palette[color] || color;
    var secondaryFontColor = (0, color_1.default)(themeColor).isDark() ? "#FFF" : "#000";
    var primaryFontSize = size / 3;
    var secondaryFontSize = size / 6;
    var circularPadding = variant === "circular" ? size / 10 : 1;
    var momentDate = (0, moment_1.default)(date);
    var calendarStyle = (0, react_1.useMemo)(function () {
        var borderRadius = theme.borderRadius / 1.5;
        if (variant === "rounded")
            return { borderRadius: borderRadius };
        if (variant === "square")
            return { borderRadius: 0 };
        return { borderRadius: 900 };
    }, [theme.borderRadius, variant]);
    var containerStyle = (0, react_1.useMemo)(function () { return [
        calendarStyle,
        {
            height: size,
            width: size,
            overflow: "hidden",
            backgroundColor: backgroundColor,
        },
        style,
    ]; }, [backgroundColor, calendarStyle, size, style]);
    var outlineText = (0, react_1.useMemo)(function () { return ({
        paddingTop: circularPadding,
        textAlign: "center",
        padding: 1,
        fontSize: secondaryFontSize,
        backgroundColor: themeColor,
        color: secondaryFontColor,
    }); }, [circularPadding, secondaryFontColor, secondaryFontSize, themeColor]);
    var centerText = (0, react_1.useMemo)(function () { return ({
        textAlign: "center",
        color: primaryFontColor,
        fontWeight: "normal",
        fontSize: primaryFontSize,
    }); }, [primaryFontColor, primaryFontSize]);
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, __assign({ nativeID: "calendarIcon" }, props, { style: containerStyle }, { children: [(0, jsx_runtime_1.jsx)(Typography_1.Typography, __assign({ style: outlineText }, { children: momentDate.format("dddd") })), (0, jsx_runtime_1.jsx)(react_native_1.View, __assign({ style: styles.centerContent }, { children: (0, jsx_runtime_1.jsx)(Typography_1.Typography, __assign({ style: centerText }, { children: momentDate.format("DD") })) })), (0, jsx_runtime_1.jsx)(Typography_1.Typography, __assign({ style: outlineText }, { children: momentDate.format("MMMM") }))] })));
});
exports.CalendarIcon.displayName = "CalendarIcon";
var styles = react_native_1.StyleSheet.create({
    centerContent: {
        flex: 1,
        justifyContent: "center",
    },
});
