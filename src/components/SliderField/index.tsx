import React, { memo, useCallback } from "react";
import { StyleSheet, View } from "react-native";
import { TextFieldHelper, TextFieldLabel, TextFieldProps } from "../TextField";
import { Slider, SliderProps } from "../Slider";
import { useTheme } from "../../theme";
import { useThemeStyle } from "../../hooks/useThemeStyle";

export type SliderFieldProps = Omit<SliderProps, "value"> &
  Omit<TextFieldProps, "value" | "onChange"> & {
    value?: number | null;
  };

export const SliderField = memo(
  ({
    disabled,
    value,
    required,
    error,
    minValue,
    color = "primary",
    containerStyle,
    helperText,
    onChange,
    label,
    ...props
  }: SliderFieldProps) => {
    const theme = useTheme();

    const currentValue = value || minValue;

    const themeColor = theme.palette[error ? "error" : color] || color;
    const disabledColor = theme.palette.disabled;

    const onChangeValue = useCallback(
      (newValue) => onChange?.(newValue),
      [onChange]
    );

    const currentColor = disabled ? disabledColor : themeColor;

    const style = useThemeStyle(
      (curTheme) => [
        styles.container,
        {
          borderColor: currentColor,
          borderRadius: curTheme.borderRadius / 1.5,
        },
        containerStyle,
      ],
      [containerStyle, currentColor]
    );

    const getLabel = useCallback((curValue) => Math.floor(curValue), []);

    return (
      <>
        <View style={style}>
          <View style={styles.flex}>
            <TextFieldLabel
              required={required}
              isActive
              disabled={disabled}
              color={color}
              error={error}
            >
              {label}
            </TextFieldLabel>
            <View style={styles.slider}>
              <Slider
                {...props}
                minValue={minValue}
                disabled={disabled}
                value={currentValue}
                getLabel={getLabel}
                onChange={onChangeValue}
              />
            </View>
          </View>
        </View>
        <TextFieldHelper color={color} error={error}>
          {helperText}
        </TextFieldHelper>
      </>
    );
  }
);
SliderField.displayName = "SliderField";

const styles = StyleSheet.create({
  slider: {
    flex: 1,
    justifyContent: "center",
  },
  flex: {
    flex: 1,
    height: "100%",
    paddingHorizontal: 10,
  },
  container: {
    borderWidth: 2,
    padding: 5,
    minHeight: 44,
    alignItems: "center",
    flexDirection: "row",
  },
});
