import React, { memo, useCallback, useMemo } from "react";
import {
  Platform,
  Pressable,
  StyleProp,
  StyleSheet,
  View,
  ViewProps,
  ViewStyle,
} from "react-native";
import { Colors, useTheme } from "../../theme";
import ColorJS from "color";
import { useHover } from "../../hooks/useHover";

export interface RadioProps extends ViewProps {
  color?: Colors;
  disabled?: boolean;
  value?: boolean;
  onChange?: (newValue: boolean) => void;
}

export const Radio = memo<RadioProps>(
  ({
    disabled,
    color = "primary",
    value = false,
    onChange,
    style,
    ...props
  }) => {
    const theme = useTheme();

    const disabledColor = theme.palette.disabled;
    const themeColor = disabled ? disabledColor : theme.palette[color] || color;
    const backgroundColor = ColorJS(themeColor).isDark() ? "#FFF" : "#000";

    const hover = useHover();

    const onClick = useCallback(() => onChange?.(!value), [value, onChange]);

    const opacity = value ? 1 : hover.isActive ? 0.5 : 0;

    const containerStyle = useMemo(
      (): StyleProp<ViewStyle> => [
        styles.container,
        { backgroundColor: themeColor },
        style,
      ],
      [style, themeColor]
    );

    const dotStyle: StyleProp<ViewStyle> = useMemo(
      () => [styles.dot, { opacity, backgroundColor }],
      [backgroundColor, opacity]
    );

    return (
      <Pressable
        {...hover.handlers}
        nativeID="radio"
        {...props}
        onPress={onClick}
        disabled={disabled}
        style={containerStyle}
      >
        {Platform.OS === "web" && (
          <input
            hidden
            type={"radio"}
            disabled={disabled}
            onChange={onClick}
            value={`${value}`}
          />
        )}
        <View style={dotStyle} />
      </Pressable>
    );
  }
);

Radio.displayName = "Radio";

const styles = StyleSheet.create({
  dot: {
    borderRadius: 999,
    padding: 6,
  },
  container: {
    borderRadius: 999,
    justifyContent: "center",
    alignItems: "center",
    width: 25,
    height: 25,
  },
});
