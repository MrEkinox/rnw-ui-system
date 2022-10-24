"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CalendarYearView = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const moment_1 = __importDefault(require("moment"));
const react_1 = require("react");
const react_native_1 = require("react-native");
const _1 = require(".");
const CalendarButton_1 = require("./CalendarButton");
exports.CalendarYearView = (0, react_1.memo)(() => {
    const { value, minDate, maxDate } = (0, _1.useCalendar)();
    const yearNumber = (0, moment_1.default)(maxDate).diff(minDate, "years");
    const years = Array.from({ length: yearNumber || 1 }).map((_, yearIndex) => (0, moment_1.default)(value).set("years", (minDate?.getFullYear() || 0) + yearIndex));
    return ((0, jsx_runtime_1.jsx)(react_native_1.ScrollView, { style: styles.scroll, contentContainerStyle: styles.container, children: years.reverse().map((year, yearIndex) => ((0, jsx_runtime_1.jsx)(CalendarButton_1.CalendarButton, { type: "years", value: year.toDate() }, yearIndex))) }));
});
exports.CalendarYearView.displayName = "CalendarYearView";
const styles = react_native_1.StyleSheet.create({
    container: {
        flexDirection: "row",
        flexWrap: "wrap",
    },
    scroll: {
        maxHeight: 200,
        marginTop: 5,
    },
});
