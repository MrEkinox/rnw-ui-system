import React, { memo, useCallback, useMemo } from "react";
import {
  Animated,
  Platform,
  Pressable,
  StyleProp,
  StyleSheet,
  View,
  ViewProps,
  ViewStyle,
} from "react-native";
import { useTheme } from "../../theme";
import { useHover } from "../../hooks/useHover";
import { Typography } from "../Typography";
import { useEffect } from "react";

export interface SwitchProps extends ViewProps {
  disabled?: boolean;
  value?: boolean;
  onChange?: (newValue: boolean) => void;
  label?: string;
}

export const Switch = memo(
  ({
    value = false,
    disabled,
    onChange,
    style,
    label,
    ...props
  }: SwitchProps) => {
    const theme = useTheme();

    const animation = useMemo(() => new Animated.Value(value ? 1 : 0), [value]);
    const hover = useHover();

    const borderRadius = theme.borderRadius;
    const successColor = theme.palette.success;
    const errorColor = theme.palette.error;
    const disabledColor = theme.palette.disabled;
    const backgroundColor = theme.palette.background.default;

    const currentColor = disabled
      ? disabledColor
      : animation.interpolate({
          inputRange: [0, 1],
          outputRange: [errorColor, successColor],
        });

    const onClick = useCallback(() => onChange?.(!value), [value, onChange]);

    useEffect(() => {
      Animated.timing(animation, {
        toValue: value ? 1 : 0,
        duration: 150,
        useNativeDriver: false,
      }).start();
    }, [animation, value]);

    const containerWidth = 50;
    const knockWidth = 15;
    const padding = 4;

    const marginLeft = animation.interpolate({
      inputRange: [0, 1],
      outputRange: [0, containerWidth - (knockWidth + padding * 2)],
    });

    const knowStyle = useMemo(
      (): Animated.WithAnimatedObject<ViewStyle> => ({
        opacity: hover.isActive ? 0.5 : 1,
        borderRadius,
        height: knockWidth,
        width: knockWidth,
        marginLeft,
        backgroundColor: currentColor,
      }),
      [borderRadius, currentColor, hover.isActive, marginLeft]
    );

    const containerStyle = useMemo(
      (): StyleProp<ViewStyle> => [
        {
          width: containerWidth,
          padding,
          borderRadius,
          backgroundColor,
        },
        style,
      ],
      [backgroundColor, borderRadius, style]
    );

    return (
      <View style={styles.flex}>
        <Pressable
          {...hover.handlers}
          nativeID="switch"
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
          <Animated.View style={knowStyle} />
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

Switch.displayName = "Switch";

const styles = StyleSheet.create({
  flex: { flexDirection: "row", alignItems: "center", flexWrap: "nowrap" },
  label: { marginLeft: 10 },
});
