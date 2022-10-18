"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useThemeStyle = void 0;
var theme_1 = require("../../theme");
var react_1 = require("react");
function useThemeStyle(callback, deps) {
    if (deps === void 0) { deps = []; }
    var theme = (0, theme_1.useTheme)();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    var func = (0, react_1.useCallback)(callback, deps);
    return (0, react_1.useMemo)(function () { return func(theme); }, [func, theme]);
}
exports.useThemeStyle = useThemeStyle;
