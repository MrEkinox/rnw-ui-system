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
import { Icon } from "../Icon";
import ColorJS from "color";
import { useHover } from "../../hooks/useHover";
import { Typography } from "../Typography";

export interface CheckboxProps extends ViewProps {
  color?: Colors;
  disabled?: boolean;
  value?: boolean;
  onChange?: (newValue: boolean) => void;
  label?: string;
}

export const Checkbox = memo<CheckboxProps>(
  ({
    disabled,
    color = "primary",
    value = false,
    onChange,
    label,
    style,
    ...props
  }) => {
    const theme = useTheme();

    const borderRadius = theme.borderRadius / 2;
    const disabledColor = theme.palette.disabled;
    const themeColor = disabled ? disabledColor : theme.palette[color] || color;
    const iconColor = ColorJS(themeColor).isDark() ? "#FFF" : "#000";

    const hover = useHover();

    const onClick = useCallback(() => onChange?.(!value), [value, onChange]);

    const opacity = value ? 1 : hover.isActive ? 0.5 : 0;

    const containerStyle: StyleProp<ViewStyle> = useMemo(
      () => [
        styles.container,
        { borderRadius, backgroundColor: themeColor },
        style,
      ],
      [borderRadius, style, themeColor]
    );

    const iconStyle: StyleProp<ViewStyle> = useMemo(
      () => ({ opacity }),
      [opacity]
    );

    return (
      <View style={styles.flex}>
        <Pressable
          {...hover.handlers}
          nativeID="checkbox"
          {...props}
          onPress={onClick}
          disabled={disabled}
          style={containerStyle}
        >
          {Platform.OS === "web" && (
            <input
              hidden
              type="checkbox"
              disabled={disabled}
              onChange={onClick}
              value={`${value}`}
            />
          )}
          <Icon
            style={iconStyle}
            type="Ionicons"
            name="checkmark"
            color={iconColor}
          />
        </Pressable>
        {label && (
          <Typography variant="body1" style={styles.label}>
            {label}
          </Typography>
        )}
      </View>
    );
  }
);

Checkbox.displayName = "Checkbox";

const styles = StyleSheet.create({
  flex: { flexDirection: "row", alignItems: "center", flexWrap: "nowrap" },
  label: { marginLeft: 10 },
  container: {
    justifyContent: "center",
    alignItems: "center",
    width: 20,
    height: 20,
  },
});
