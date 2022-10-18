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
exports.Calendar = exports.useCalendar = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
var moment_1 = __importDefault(require("moment"));
var react_1 = require("react");
var react_native_1 = require("react-native");
var theme_1 = require("../../theme");
var Button_1 = require("../Button");
var CalendarDay_1 = require("./CalendarDay");
var CalendarYearView_1 = require("./CalendarYearView");
var CalendarMonthSelector_1 = require("./CalendarMonthSelector");
var CalendarContext = (0, react_1.createContext)({
    color: "primary",
    displayedDate: new Date(),
    maxDate: (0, moment_1.default)().add("100", "years").toDate(),
    minDate: (0, moment_1.default)().subtract("100", "years").toDate(),
    onSelect: function () { },
    toggleView: function () { },
    getDateInfo: function () { return ({}); },
    onChangeYear: function () { },
    onChangeMonth: function () { },
});
CalendarContext.displayName = "CalendarContext";
var useCalendar = function () { return (0, react_1.useContext)(CalendarContext); };
exports.useCalendar = useCalendar;
var MIN_DATE = (0, moment_1.default)().subtract(100, "years").toDate();
var MAX_DATE = (0, moment_1.default)().add(100, "years").toDate();
var NOW_DATE = new Date();
exports.Calendar = (0, react_1.memo)(function (_a) {
    var style = _a.style, onSingleChange = _a.onSingleChange, onRangeChange = _a.onRangeChange, _b = _a.maxDate, maxDate = _b === void 0 ? MAX_DATE : _b, _c = _a.minDate, minDate = _c === void 0 ? MIN_DATE : _c, value = _a.value, endDate = _a.endDate, interactive = _a.interactive, _d = _a.mode, mode = _d === void 0 ? "single" : _d, startDate = _a.startDate, _e = _a.color, color = _e === void 0 ? "primary" : _e, props = __rest(_a, ["style", "onSingleChange", "onRangeChange", "maxDate", "minDate", "value", "endDate", "interactive", "mode", "startDate", "color"]);
    var theme = (0, theme_1.useTheme)();
    var _f = (0, react_1.useState)(value || NOW_DATE), displayedDate = _f[0], setDisplayedDate = _f[1];
    var _g = (0, react_1.useState)("days"), viewMode = _g[0], setViewMode = _g[1];
    (0, react_1.useEffect)(function () {
        var newValue = value || NOW_DATE;
        if (maxDate && (0, moment_1.default)(newValue).isAfter(maxDate)) {
            setDisplayedDate(maxDate);
        }
        else if (minDate && (0, moment_1.default)(newValue).isBefore(minDate)) {
            setDisplayedDate(minDate);
        }
        else {
            setDisplayedDate(newValue);
        }
    }, [maxDate, minDate, value]);
    var toggleView = (0, react_1.useCallback)(function (newViewMode) {
        setViewMode(viewMode === newViewMode ? "days" : newViewMode);
    }, [viewMode]);
    var onChangeMonth = (0, react_1.useCallback)(function (newDate) {
        setDisplayedDate(newDate);
        toggleView("days");
    }, [toggleView]);
    var onChangeYear = (0, react_1.useCallback)(function (newDate) {
        setDisplayedDate(newDate);
        toggleView("days");
    }, [toggleView]);
    var onSelect = (0, react_1.useCallback)(function (newDate) {
        if (mode === "range") {
            var newStartValue = newDate;
            var newEndValue = newDate;
            if (!startDate || !(0, moment_1.default)(startDate).isSame(endDate, "day")) {
                newStartValue = newDate;
                newEndValue = newDate;
            }
            else if ((0, moment_1.default)(newDate).isBefore(startDate)) {
                newStartValue = newDate;
                newEndValue = startDate;
            }
            else {
                newStartValue = startDate;
                newEndValue = newDate;
            }
            onRangeChange === null || onRangeChange === void 0 ? void 0 : onRangeChange((0, moment_1.default)(newStartValue).set("hours", 9).toDate(), (0, moment_1.default)(newEndValue).set("hours", 19).toDate());
        }
        else if (mode === "single") {
            onSingleChange === null || onSingleChange === void 0 ? void 0 : onSingleChange(newDate);
        }
    }, [endDate, mode, onRangeChange, onSingleChange, startDate]);
    var getDateInfo = (0, react_1.useCallback)(function (curValue, type) {
        var parsedValue = (0, moment_1.default)(curValue);
        var isSame = mode !== "range" && parsedValue.isSame(value, type);
        var isFirst = !!startDate && parsedValue.isSame(startDate, type);
        var isLast = endDate ? parsedValue.isSame(endDate, type) : isFirst;
        var isFirstOrLast = isFirst || isLast;
        var isBetween = !isFirstOrLast &&
            !!endDate &&
            parsedValue.isBetween(startDate, endDate);
        var selected = isSame || isBetween || isFirstOrLast;
        var disabled = props.disabled || !parsedValue.isBetween(minDate, maxDate);
        return {
            isSame: isSame,
            isFirst: isFirst,
            isFirstOrLast: isFirstOrLast,
            isLast: isLast,
            isBetween: isBetween,
            selected: selected,
            disabled: disabled,
        };
    }, [endDate, maxDate, minDate, mode, props.disabled, startDate, value]);
    var themeColor = theme.palette[color] || color;
    var setYearsView = (0, react_1.useCallback)(function () { return toggleView("years"); }, [toggleView]);
    var flexStyle = (0, react_1.useMemo)(function () { return styles.flex; }, []);
    var providerValue = (0, react_1.useMemo)(function () { return ({
        getDateInfo: getDateInfo,
        toggleView: toggleView,
        onChangeYear: onChangeYear,
        onChangeMonth: onChangeMonth,
        color: themeColor,
        onSelect: onSelect,
        displayedDate: displayedDate,
        maxDate: maxDate,
        minDate: minDate,
        value: value || NOW_DATE,
        disabled: props.disabled,
        mode: mode,
        interactive: interactive,
    }); }, [
        mode,
        displayedDate,
        getDateInfo,
        maxDate,
        minDate,
        onChangeMonth,
        onChangeYear,
        interactive,
        onSelect,
        props.disabled,
        themeColor,
        toggleView,
        value,
    ]);
    return ((0, jsx_runtime_1.jsx)(CalendarContext.Provider, __assign({ value: providerValue }, { children: (0, jsx_runtime_1.jsxs)(react_native_1.View, __assign({}, props, { style: style }, { children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, __assign({ style: flexStyle }, { children: [(0, jsx_runtime_1.jsx)(CalendarMonthSelector_1.CalendarMonthSelector, {}), (0, jsx_runtime_1.jsx)(Button_1.Button, __assign({ onPress: setYearsView, size: "small", color: themeColor, style: styles.btn }, { children: (0, moment_1.default)(displayedDate).format("YYYY") }))] })), viewMode === "days" && (0, jsx_runtime_1.jsx)(CalendarDay_1.CalendarDayView, {}), viewMode === "years" && (0, jsx_runtime_1.jsx)(CalendarYearView_1.CalendarYearView, {})] })) })));
});
exports.Calendar.displayName = "Calendar";
var styles = react_native_1.StyleSheet.create({
    btn: {
        marginLeft: 10,
    },
    flex: {
        flexDirection: "row",
        alignItems: "center",
    },
});
