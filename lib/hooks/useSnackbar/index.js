"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SnackbarProvider = exports.useSnackbar = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const react_native_1 = require("react-native");
const Snackbar_1 = require("../../components/Snackbar");
const SnackbarContext = (0, react_1.createContext)({
    enqueueSnackbar: () => { },
    closeSnackbar: () => { },
});
SnackbarContext.displayName = "SnackbarContext";
const useSnackbar = () => (0, react_1.useContext)(SnackbarContext);
exports.useSnackbar = useSnackbar;
exports.SnackbarProvider = (0, react_1.memo)((props) => {
    const [snackbars, setSnackbars] = (0, react_1.useState)([]);
    const closeSnackbar = (0, react_1.useCallback)((id) => {
        setSnackbars((snackbar) => snackbar.filter((snack) => snack.id !== id));
    }, []);
    const enqueueSnackbar = (0, react_1.useCallback)(({ force, duration, ...options }) => new Promise((resolve) => {
        const id = Math.floor(Math.random() * 16);
        setSnackbars((curSnacks) => {
            if (!force &&
                curSnacks.find(({ message }) => message === options.message))
                return curSnacks;
            return [...curSnacks, { id, ...options }];
        });
        if (duration !== -1) {
            setTimeout(() => {
                closeSnackbar(id);
                resolve();
            }, duration || 3000);
        }
        else
            resolve();
    }), [closeSnackbar]);
    const snackbarPostion = (0, react_1.useMemo)(() => snackbars.reduce((acc, snackbar) => {
        if (snackbar.position === "right") {
            return { ...acc, right: [...acc.right, snackbar] };
        }
        if (snackbar.position === "center") {
            return { ...acc, center: [...acc.center, snackbar] };
        }
        return { ...acc, left: [...acc.left, snackbar] };
    }, {
        right: [],
        left: [],
        center: [],
    }), [snackbars]);
    const providerValue = (0, react_1.useMemo)(() => ({ enqueueSnackbar, closeSnackbar }), [closeSnackbar, enqueueSnackbar]);
    return ((0, jsx_runtime_1.jsxs)(SnackbarContext.Provider, { value: providerValue, children: [props.children, (0, jsx_runtime_1.jsx)(react_native_1.View, { style: styles.bottomLeft, children: snackbarPostion.left.map((snackbar, index) => ((0, jsx_runtime_1.jsx)(Snackbar_1.Snackbar, { style: styles.margin, ...snackbar }, index))) }), (0, jsx_runtime_1.jsx)(react_native_1.View, { style: styles.bottomRight, children: snackbarPostion.right.map((snackbar, index) => ((0, jsx_runtime_1.jsx)(Snackbar_1.Snackbar, { style: styles.margin, ...snackbar }, index))) }), (0, jsx_runtime_1.jsx)(react_native_1.View, { style: styles.bottomCenter, children: snackbarPostion.center.map((snackbar, index) => ((0, jsx_runtime_1.jsx)(Snackbar_1.Snackbar, { style: styles.margin, ...snackbar }, index))) })] }));
});
const styles = react_native_1.StyleSheet.create({
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
