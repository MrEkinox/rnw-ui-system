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
exports.CalendarYearView = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
var moment_1 = __importDefault(require("moment"));
var react_1 = require("react");
var react_native_1 = require("react-native");
var _1 = require(".");
var CalendarButton_1 = require("./CalendarButton");
exports.CalendarYearView = (0, react_1.memo)(function () {
    var _a = (0, _1.useCalendar)(), value = _a.value, minDate = _a.minDate, maxDate = _a.maxDate;
    var yearNumber = (0, moment_1.default)(maxDate).diff(minDate, "years");
    var years = Array.from({ length: yearNumber || 1 }).map(function (_, yearIndex) {
        return (0, moment_1.default)(value).set("years", ((minDate === null || minDate === void 0 ? void 0 : minDate.getFullYear()) || 0) + yearIndex);
    });
    return ((0, jsx_runtime_1.jsx)(react_native_1.ScrollView, __assign({ style: styles.scroll, contentContainerStyle: styles.container }, { children: years.reverse().map(function (year, yearIndex) { return ((0, jsx_runtime_1.jsx)(CalendarButton_1.CalendarButton, { type: "years", value: year.toDate() }, yearIndex)); }) })));
});
exports.CalendarYearView.displayName = "CalendarYearView";
var styles = react_native_1.StyleSheet.create({
    container: {
        flexDirection: "row",
        flexWrap: "wrap",
    },
    scroll: {
        maxHeight: 200,
        marginTop: 5,
    },
});
