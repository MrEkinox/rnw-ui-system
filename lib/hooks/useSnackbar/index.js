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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SnackbarProvider = exports.useSnackbar = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var react_native_1 = require("react-native");
var Snackbar_1 = require("../../components/Snackbar");
var SnackbarContext = (0, react_1.createContext)({
    enqueueSnackbar: function () { },
    closeSnackbar: function () { },
});
SnackbarContext.displayName = "SnackbarContext";
var useSnackbar = function () { return (0, react_1.useContext)(SnackbarContext); };
exports.useSnackbar = useSnackbar;
exports.SnackbarProvider = (0, react_1.memo)(function (props) {
    var _a = (0, react_1.useState)([]), snackbars = _a[0], setSnackbars = _a[1];
    var closeSnackbar = (0, react_1.useCallback)(function (id) {
        setSnackbars(function (snackbar) { return snackbar.filter(function (snack) { return snack.id !== id; }); });
    }, []);
    var enqueueSnackbar = (0, react_1.useCallback)(function (_a) {
        var force = _a.force, duration = _a.duration, options = __rest(_a, ["force", "duration"]);
        return new Promise(function (resolve) {
            var id = Math.floor(Math.random() * 16);
            setSnackbars(function (curSnacks) {
                if (!force &&
                    curSnacks.find(function (_a) {
                        var message = _a.message;
                        return message === options.message;
                    }))
                    return curSnacks;
                return __spreadArray(__spreadArray([], curSnacks, true), [__assign({ id: id }, options)], false);
            });
            if (duration !== -1) {
                setTimeout(function () {
                    closeSnackbar(id);
                    resolve();
                }, duration || 3000);
            }
            else
                resolve();
        });
    }, [closeSnackbar]);
    var snackbarPostion = (0, react_1.useMemo)(function () {
        return snackbars.reduce(function (acc, snackbar) {
            if (snackbar.position === "right") {
                return __assign(__assign({}, acc), { right: __spreadArray(__spreadArray([], acc.right, true), [snackbar], false) });
            }
            if (snackbar.position === "center") {
                return __assign(__assign({}, acc), { center: __spreadArray(__spreadArray([], acc.center, true), [snackbar], false) });
            }
            return __assign(__assign({}, acc), { left: __spreadArray(__spreadArray([], acc.left, true), [snackbar], false) });
        }, {
            right: [],
            left: [],
            center: [],
        });
    }, [snackbars]);
    var providerValue = (0, react_1.useMemo)(function () { return ({ enqueueSnackbar: enqueueSnackbar, closeSnackbar: closeSnackbar }); }, [closeSnackbar, enqueueSnackbar]);
    return ((0, jsx_runtime_1.jsxs)(SnackbarContext.Provider, __assign({ value: providerValue }, { children: [props.children, (0, jsx_runtime_1.jsx)(react_native_1.View, __assign({ style: styles.bottomLeft }, { children: snackbarPostion.left.map(function (snackbar, index) { return ((0, jsx_runtime_1.jsx)(Snackbar_1.Snackbar, __assign({ style: styles.margin }, snackbar), index)); }) })), (0, jsx_runtime_1.jsx)(react_native_1.View, __assign({ style: styles.bottomRight }, { children: snackbarPostion.right.map(function (snackbar, index) { return ((0, jsx_runtime_1.jsx)(Snackbar_1.Snackbar, __assign({ style: styles.margin }, snackbar), index)); }) })), (0, jsx_runtime_1.jsx)(react_native_1.View, __assign({ style: styles.bottomCenter }, { children: snackbarPostion.center.map(function (snackbar, index) { return ((0, jsx_runtime_1.jsx)(Snackbar_1.Snackbar, __assign({ style: styles.margin }, snackbar), index)); }) }))] })));
});
var styles = react_native_1.StyleSheet.create({
    bottomLeft: {
        position: "absolute",
        left: 20,
        bottom: 20,
    },
    bottomRight: {
        position: "absolute",
        right: 20,
        bottom: 20,
    },
    bottomCenter: {
        position: "absolute",
        right: 0,
        left: 0,
        alignItems: "center",
        bottom: 20,
    },
    margin: {
        marginTop: 10,
    },
});
exports.SnackbarProvider.displayName = "SnackbarProvider";
