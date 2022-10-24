import { useTheme } from "../../theme";
import { useCallback, useMemo } from "react";
export function useThemeStyle(callback, deps = []) {
    const theme = useTheme();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const func = useCallback(callback, deps);
    return useMemo(() => func(theme), [func, theme]);
}
