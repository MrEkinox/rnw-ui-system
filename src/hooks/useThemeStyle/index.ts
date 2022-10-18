import { DefaultThemeOptions, useTheme } from "../../theme";
import { useCallback, useMemo } from "react";
import { Animated, StyleProp, TextStyle, ViewStyle } from "react-native";

export function useThemeStyle<
  T extends
    | StyleProp<TextStyle | ViewStyle>
    | Animated.WithAnimatedObject<ViewStyle | TextStyle>
>(
  callback: (theme: DefaultThemeOptions) => T,
  deps: React.DependencyList = []
): T {
  const theme = useTheme();

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const func = useCallback(callback, deps);

  return useMemo(() => func(theme), [func, theme]);
}
