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
    const enqueueSnackbar = useCallback(({ force, duration, ...options }) => new Promise((resolve) => {
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
    const snackbarPostion = useMemo(() => snackbars.reduce((acc, snackbar) => {
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
    const providerValue = useMemo(() => ({ enqueueSnackbar, closeSnackbar }), [closeSnackbar, enqueueSnackbar]);
    return (_jsxs(SnackbarContext.Provider, { value: providerValue, children: [props.children, _jsx(View, { style: styles.bottomLeft, children: snackbarPostion.left.map((snackbar, index) => (_jsx(Snackbar, { style: styles.margin, ...snackbar }, index))) }), _jsx(View, { style: styles.bottomRight, children: snackbarPostion.right.map((snackbar, index) => (_jsx(Snackbar, { style: styles.margin, ...snackbar }, index))) }), _jsx(View, { style: styles.bottomCenter, children: snackbarPostion.center.map((snackbar, index) => (_jsx(Snackbar, { style: styles.margin, ...snackbar }, index))) })] }));
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
