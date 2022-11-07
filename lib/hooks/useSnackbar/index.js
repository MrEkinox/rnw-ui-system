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
import { createContext, memo, useCallback, useContext, useMemo, useState, } from "react";
import { StyleSheet, View } from "react-native";
import { Snackbar } from "../../components/Snackbar";
const SnackbarContext = createContext({
    enqueueSnackbar: () => { },
    closeSnackbar: () => { },
});
SnackbarContext.displayName = "SnackbarContext";
export const useSnackbar = () => useContext(SnackbarContext);
export const SnackbarProvider = memo((props) => {
    const [snackbars, setSnackbars] = useState([]);
    const closeSnackbar = useCallback((id) => {
        setSnackbars((snackbar) => snackbar.filter((snack) => snack.id !== id));
    }, []);
    const enqueueSnackbar = useCallback((_a) => {
        var { force, duration } = _a, options = __rest(_a, ["force", "duration"]);
        return new Promise((resolve) => {
            const id = Math.floor(Math.random() * 16);
            setSnackbars((curSnacks) => {
                if (!force &&
                    curSnacks.find(({ message }) => message === options.message))
                    return curSnacks;
                return [...curSnacks, Object.assign({ id }, options)];
            });
            if (duration !== -1) {
                setTimeout(() => {
                    closeSnackbar(id);
                    resolve();
                }, duration || 3000);
            }
            else
                resolve();
        });
    }, [closeSnackbar]);
    const snackbarPostion = useMemo(() => snackbars.reduce((acc, snackbar) => {
        if (snackbar.position === "right") {
            return Object.assign(Object.assign({}, acc), { right: [...acc.right, snackbar] });
        }
        if (snackbar.position === "center") {
            return Object.assign(Object.assign({}, acc), { center: [...acc.center, snackbar] });
        }
        return Object.assign(Object.assign({}, acc), { left: [...acc.left, snackbar] });
    }, {
        right: [],
        left: [],
        center: [],
    }), [snackbars]);
    const providerValue = useMemo(() => ({ enqueueSnackbar, closeSnackbar }), [closeSnackbar, enqueueSnackbar]);
    return (_jsxs(SnackbarContext.Provider, Object.assign({ value: providerValue }, { children: [props.children, _jsx(View, Object.assign({ style: styles.bottomLeft }, { children: snackbarPostion.left.map((snackbar, index) => (_jsx(Snackbar, Object.assign({ style: styles.margin }, snackbar), index))) })), _jsx(View, Object.assign({ style: styles.bottomRight }, { children: snackbarPostion.right.map((snackbar, index) => (_jsx(Snackbar, Object.assign({ style: styles.margin }, snackbar), index))) })), _jsx(View, Object.assign({ style: styles.bottomCenter }, { children: snackbarPostion.center.map((snackbar, index) => (_jsx(Snackbar, Object.assign({ style: styles.margin }, snackbar), index))) }))] })));
});
const styles = StyleSheet.create({
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
SnackbarProvider.displayName = "SnackbarProvider";
