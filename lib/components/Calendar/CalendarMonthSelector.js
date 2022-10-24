"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CalendarMonthSelector = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const IconButton_1 = require("../IconButton");
const Typography_1 = require("../Typography");
const moment_1 = __importDefault(require("moment"));
const react_1 = require("react");
const react_native_1 = require("react-native");
const Icon_1 = require("../Icon");
const _1 = require(".");
exports.CalendarMonthSelector = (0, react_1.memo)(() => {
    const { displayedDate, onChangeMonth, color } = (0, _1.useCalendar)();
    const onNextMonth = (0, react_1.useCallback)(() => {
        onChangeMonth((0, moment_1.default)(displayedDate).add(1, "months").toDate());
    }, [displayedDate, onChangeMonth]);
    const onPreviousMonth = (0, react_1.useCallback)(() => {
        onChangeMonth((0, moment_1.default)(displayedDate).subtract(1, "months").toDate());
    }, [displayedDate, onChangeMonth]);
    const text = (0, moment_1.default)(displayedDate).format("MMMM");
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: styles.container, children: [(0, jsx_runtime_1.jsx)(IconButton_1.IconButton, { size: "small", variant: "hovered", color: color, onPress: onPreviousMonth, children: (0, jsx_runtime_1.jsx)(Icon_1.Icon, { type: "Ionicons", name: "chevron-back" }) }), (0, jsx_runtime_1.jsx)(Typography_1.Typography, { variant: "h6", align: "center", style: styles.text, children: text.at(0)?.toUpperCase() + text.substring(1) }), (0, jsx_runtime_1.jsx)(IconButton_1.IconButton, { size: "small", variant: "hovered", color: color, onPress: onNextMonth, children: (0, jsx_runtime_1.jsx)(Icon_1.Icon, { type: "Ionicons", name: "chevron-forward" }) })] }));
});
exports.CalendarMonthSelector.displayName = "CalendarMonthSelector";
const styles = react_native_1.StyleSheet.create({
    container: {
        flexDirection: "row",
        flexWrap: "nowrap",
        alignItems: "center",
        flex: 1,
    },
    text: {
        flex: 1,
    },
});
