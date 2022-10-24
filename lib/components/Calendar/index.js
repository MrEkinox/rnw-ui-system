"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Calendar = exports.useCalendar = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const moment_1 = __importDefault(require("moment"));
const react_1 = require("react");
const react_native_1 = require("react-native");
const theme_1 = require("../../theme");
const Button_1 = require("../Button");
const CalendarDay_1 = require("./CalendarDay");
const CalendarYearView_1 = require("./CalendarYearView");
const CalendarMonthSelector_1 = require("./CalendarMonthSelector");
const CalendarContext = (0, react_1.createContext)({
    color: "primary",
    displayedDate: new Date(),
    maxDate: (0, moment_1.default)().add("100", "years").toDate(),
    minDate: (0, moment_1.default)().subtract("100", "years").toDate(),
    onSelect: () => { },
    toggleView: () => { },
    getDateInfo: () => ({}),
    onChangeYear: () => { },
    onChangeMonth: () => { },
});
CalendarContext.displayName = "CalendarContext";
const useCalendar = () => (0, react_1.useContext)(CalendarContext);
exports.useCalendar = useCalendar;
const MIN_DATE = (0, moment_1.default)().subtract(100, "years").toDate();
const MAX_DATE = (0, moment_1.default)().add(100, "years").toDate();
const NOW_DATE = new Date();
exports.Calendar = (0, react_1.memo)(({ style, onSingleChange, onRangeChange, maxDate = MAX_DATE, minDate = MIN_DATE, value, endDate, interactive, mode = "single", startDate, color = "primary", ...props }) => {
    const theme = (0, theme_1.useTheme)();
    const [displayedDate, setDisplayedDate] = (0, react_1.useState)(value || NOW_DATE);
    const [viewMode, setViewMode] = (0, react_1.useState)("days");
    (0, react_1.useEffect)(() => {
        const newValue = value || NOW_DATE;
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
    const toggleView = (0, react_1.useCallback)((newViewMode) => {
        setViewMode(viewMode === newViewMode ? "days" : newViewMode);
    }, [viewMode]);
    const onChangeMonth = (0, react_1.useCallback)((newDate) => {
        setDisplayedDate(newDate);
        toggleView("days");
    }, [toggleView]);
    const onChangeYear = (0, react_1.useCallback)((newDate) => {
        setDisplayedDate(newDate);
        toggleView("days");
    }, [toggleView]);
    const onSelect = (0, react_1.useCallback)((newDate) => {
        if (mode === "range") {
            let newStartValue = newDate;
            let newEndValue = newDate;
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
            onRangeChange?.((0, moment_1.default)(newStartValue).set("hours", 9).toDate(), (0, moment_1.default)(newEndValue).set("hours", 19).toDate());
        }
        else if (mode === "single") {
            onSingleChange?.(newDate);
        }
    }, [endDate, mode, onRangeChange, onSingleChange, startDate]);
    const getDateInfo = (0, react_1.useCallback)((curValue, type) => {
        const parsedValue = (0, moment_1.default)(curValue);
        const isSame = mode !== "range" && parsedValue.isSame(value, type);
        const isFirst = !!startDate && parsedValue.isSame(startDate, type);
        const isLast = endDate ? parsedValue.isSame(endDate, type) : isFirst;
        const isFirstOrLast = isFirst || isLast;
        const isBetween = !isFirstOrLast &&
            !!endDate &&
            parsedValue.isBetween(startDate, endDate);
        const selected = isSame || isBetween || isFirstOrLast;
        const disabled = props.disabled || !parsedValue.isBetween(minDate, maxDate);
        return {
            isSame,
            isFirst,
            isFirstOrLast,
            isLast,
            isBetween,
            selected,
            disabled,
        };
    }, [endDate, maxDate, minDate, mode, props.disabled, startDate, value]);
    const themeColor = theme.palette[color] || color;
    const setYearsView = (0, react_1.useCallback)(() => toggleView("years"), [toggleView]);
    const flexStyle = (0, react_1.useMemo)(() => styles.flex, []);
    const providerValue = (0, react_1.useMemo)(() => ({
        getDateInfo,
        toggleView,
        onChangeYear,
        onChangeMonth,
        color: themeColor,
        onSelect,
        displayedDate,
        maxDate,
        minDate,
        value: value || NOW_DATE,
        disabled: props.disabled,
        mode,
        interactive,
    }), [
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
    return ((0, jsx_runtime_1.jsx)(CalendarContext.Provider, { value: providerValue, children: (0, jsx_runtime_1.jsxs)(react_native_1.View, { ...props, style: style, children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: flexStyle, children: [(0, jsx_runtime_1.jsx)(CalendarMonthSelector_1.CalendarMonthSelector, {}), (0, jsx_runtime_1.jsx)(Button_1.Button, { onPress: setYearsView, size: "small", color: themeColor, style: styles.btn, children: (0, moment_1.default)(displayedDate).format("YYYY") })] }), viewMode === "days" && (0, jsx_runtime_1.jsx)(CalendarDay_1.CalendarDayView, {}), viewMode === "years" && (0, jsx_runtime_1.jsx)(CalendarYearView_1.CalendarYearView, {})] }) }));
});
exports.Calendar.displayName = "Calendar";
const styles = react_native_1.StyleSheet.create({
    btn: {
        marginLeft: 10,
    },
    flex: {
        flexDirection: "row",
        alignItems: "center",
    },
});
