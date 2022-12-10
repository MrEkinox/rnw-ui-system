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
import { jsx as _jsx } from "react/jsx-runtime";
import { memo, useContext, useMemo } from "react";
import { useColorScheme, View, } from "react-native";
import merge from "deepmerge";
import { createContext } from "react";
import { SnackbarProvider } from "..";
const DefaultLightTheme = {
    isDark: false,
    intl: {
        selectField: {
            empty: "Aucun résultat",
        },
    },
    palette: {
        primary: "#3D5AFE",
        secondary: "#7C4DFF",
        success: "#008000",
        error: "#EE0701",
        warning: "#F2BB2E",
        info: "#2196F3",
        text: "#000",
        background: {
            default: "#f5f5f5",
            card: "#FFF",
        },
        skeleton: "#bbb9c720",
        disabled: "#bbb9c780",
        divider: "#3D5AFE",
    },
    borderRadius: 10,
    typography: {
        fontFamily: "Nunito, sans-serif",
        h1: {
            fontSize: 96,
            letterSpacing: -0.1,
            fontWeight: "400",
        },
        h2: {
            fontSize: 60,
            letterSpacing: -0.5,
            fontWeight: "400",
        },
        h3: {
            fontSize: 48,
            letterSpacing: 0,
            fontWeight: "400",
        },
        h4: {
            fontSize: 34,
            letterSpacing: 0.25,
            fontWeight: "400",
        },
        h5: {
            fontSize: 24,
            letterSpacing: 0,
            fontWeight: "400",
        },
        h6: {
            fontSize: 20,
            letterSpacing: 0.15,
            fontWeight: "500",
        },
        body1: {
            fontSize: 16,
            letterSpacing: 0.5,
            fontWeight: "400",
        },
        body2: {
            fontSize: 14,
            letterSpacing: 0.25,
            fontWeight: "400",
        },
        subtitle1: {
            fontSize: 16,
            letterSpacing: 0.15,
            fontWeight: "400",
        },
        subtitle2: {
            fontSize: 14,
            letterSpacing: 0.1,
            fontWeight: "500",
        },
        button: {
            fontSize: 14,
            letterSpacing: 1.25,
            fontWeight: "500",
        },
        caption: {
            fontSize: 12,
            letterSpacing: 0.4,
            fontStyle: "normal",
            fontWeight: "400",
        },
        overline: {
            fontSize: 10,
            letterSpacing: 1.5,
            lineHeight: 1,
            fontWeight: "400",
            textTransform: "uppercase",
        },
    },
};
const DefaultDarkTheme = {
    isDark: true,
    palette: {
        text: "white",
        background: {
            default: "#0f0f0f",
            card: "#000",
        },
        divider: "#4a4a4a",
    },
};
export const ThemeContext = createContext(DefaultLightTheme);
ThemeContext.displayName = "ThemeContext";
export const useTheme = () => useContext(ThemeContext);
export const ThemeProvider = memo((_a) => {
    var _b;
    var { children, mode = "auto", snackbar = true, theme } = _a, props = __rest(_a, ["children", "mode", "snackbar", "theme"]);
    const deviceThemeMode = useColorScheme();
    const combinedTheme = useMemo(() => {
        const isDarkMode = mode === "dark" || (mode === "auto" && deviceThemeMode === "dark");
        const defaultTheme = merge(DefaultLightTheme, isDarkMode ? DefaultDarkTheme : {});
        return merge(defaultTheme, theme || {});
    }, [deviceThemeMode, mode, theme]);
    const style = useMemo(() => {
        var _a;
        return [
            {
                backgroundColor: (_a = combinedTheme.palette.background) === null || _a === void 0 ? void 0 : _a.default,
                minHeight: "100%",
            },
            props.style,
        ];
    }, [(_b = combinedTheme.palette.background) === null || _b === void 0 ? void 0 : _b.default, props.style]);
    return (_jsx(ThemeContext.Provider, Object.assign({ value: combinedTheme }, { children: snackbar ? (_jsx(SnackbarProvider, { children: _jsx(View, Object.assign({ style: style }, { children: children })) })) : (_jsx(View, Object.assign({ style: style }, { children: children }))) })));
});
ThemeProvider.displayName = "ThemeProvider";
