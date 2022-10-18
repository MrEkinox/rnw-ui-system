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
exports.CalendarMonthSelector = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
var IconButton_1 = require("../IconButton");
var Typography_1 = require("../Typography");
var moment_1 = __importDefault(require("moment"));
var react_1 = require("react");
var react_native_1 = require("react-native");
var Icon_1 = require("../Icon");
var _1 = require(".");
exports.CalendarMonthSelector = (0, react_1.memo)(function () {
    var _a;
    var _b = (0, _1.useCalendar)(), displayedDate = _b.displayedDate, onChangeMonth = _b.onChangeMonth, color = _b.color;
    var onNextMonth = (0, react_1.useCallback)(function () {
        onChangeMonth((0, moment_1.default)(displayedDate).add(1, "months").toDate());
    }, [displayedDate, onChangeMonth]);
    var onPreviousMonth = (0, react_1.useCallback)(function () {
        onChangeMonth((0, moment_1.default)(displayedDate).subtract(1, "months").toDate());
    }, [displayedDate, onChangeMonth]);
    var text = (0, moment_1.default)(displayedDate).format("MMMM");
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, __assign({ style: styles.container }, { children: [(0, jsx_runtime_1.jsx)(IconButton_1.IconButton, __assign({ size: "small", variant: "hovered", color: color, onPress: onPreviousMonth }, { children: (0, jsx_runtime_1.jsx)(Icon_1.Icon, { type: "Ionicons", name: "chevron-back" }) })), (0, jsx_runtime_1.jsx)(Typography_1.Typography, __assign({ variant: "h6", align: "center", style: styles.text }, { children: ((_a = text.at(0)) === null || _a === void 0 ? void 0 : _a.toUpperCase()) + text.substring(1) })), (0, jsx_runtime_1.jsx)(IconButton_1.IconButton, __assign({ size: "small", variant: "hovered", color: color, onPress: onNextMonth }, { children: (0, jsx_runtime_1.jsx)(Icon_1.Icon, { type: "Ionicons", name: "chevron-forward" }) }))] })));
});
exports.CalendarMonthSelector.displayName = "CalendarMonthSelector";
var styles = react_native_1.StyleSheet.create({
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
