import { Typography } from "../Typography";
import { useHover } from "../../hooks/useHover";
import { Colors, useTheme } from "../../theme";
import React, { memo, useMemo, useCallback } from "react";
import {
  PressableProps,
  LayoutChangeEvent,
  StyleProp,
  ViewStyle,
  Pressable,
} from "react-native";
import ColorJS from "color";

interface TabProps extends Omit<PressableProps, "onPress" | "onLayout"> {
  color?: Colors;
  value: any;
  selected?: boolean;
  onPress: (value: any) => void;
  onLayout: (value: any, event: LayoutChangeEvent) => void;
}

export const Tab = memo<React.PropsWithChildren<TabProps>>(
  ({ color, selected, value, children, onPress, onLayout, ...props }) => {
    const hover = useHover();
    const theme = useTheme();

    const backgroundColor = theme.palette.background.card;

    const fondColor = selected ? color : backgroundColor;

    const style: StyleProp<ViewStyle> = useMemo(
      () => ({
        opacity: hover.isActive ? 0.5 : 1,
        paddingVertical: 10,
        paddingHorizontal: 20,
      }),
      [hover.isActive]
    );

    const onSelectTab = useCallback(() => onPress(value), [onPress, value]);

    const onLayoutTab = useCallback(
      (e) => onLayout(value, e),
      [onLayout, value]
    );

    return (
      <Pressable
        onPress={onSelectTab}
        onLayout={onLayoutTab}
        {...hover.handlers}
        {...props}
        style={style}
      >
        <Typography color={ColorJS(fondColor).isDark() ? "#FFF" : "#000"}>
          {children}
        </Typography>
      </Pressable>
    );
  }
);
Tab.displayName = "Tab";
