"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ThemeProvider = exports.useTheme = exports.ThemeContext = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const react_native_1 = require("react-native");
const deepmerge_1 = __importDefault(require("deepmerge"));
const react_2 = require("react");
const __1 = require("..");
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
exports.ThemeContext = (0, react_2.createContext)(DefaultLightTheme);
exports.ThemeContext.displayName = "ThemeContext";
const useTheme = () => (0, react_1.useContext)(exports.ThemeContext);
exports.useTheme = useTheme;
exports.ThemeProvider = (0, react_1.memo)(({ children, mode = "auto", theme, ...props }) => {
    const deviceThemeMode = (0, react_native_1.useColorScheme)();
    const combinedTheme = (0, react_1.useMemo)(() => {
        const isDarkMode = mode === "dark" || (mode === "auto" && deviceThemeMode === "dark");
        const defaultTheme = (0, deepmerge_1.default)(DefaultLightTheme, isDarkMode ? DefaultDarkTheme : {});
        return (0, deepmerge_1.default)(defaultTheme, theme || {});
    }, [deviceThemeMode, mode, theme]);
    const style = (0, react_1.useMemo)(() => [
        {
            backgroundColor: combinedTheme.palette.background?.default,
            minHeight: "100%",
        },
        props.style,
    ], [combinedTheme.palette.background?.default, props.style]);
    return ((0, jsx_runtime_1.jsx)(exports.ThemeContext.Provider, { value: combinedTheme, children: (0, jsx_runtime_1.jsx)(__1.SnackbarProvider, { children: (0, jsx_runtime_1.jsx)(react_native_1.View, { style: style, children: children }) }) }));
});
exports.ThemeProvider.displayName = "ThemeProvider";
