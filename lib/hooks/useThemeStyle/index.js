"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useThemeStyle = void 0;
const theme_1 = require("../../theme");
const react_1 = require("react");
function useThemeStyle(callback, deps = []) {
    const theme = (0, theme_1.useTheme)();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const func = (0, react_1.useCallback)(callback, deps);
    return (0, react_1.useMemo)(() => func(theme), [func, theme]);
}
exports.useThemeStyle = useThemeStyle;
