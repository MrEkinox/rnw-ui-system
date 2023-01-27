import React, { memo, useCallback, useEffect, useMemo, useState } from "react";
import { StyleSheet, TextInput, View } from "react-native";
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
    maxValue,
    color = "primary",
    containerStyle,
    helperText,
    onChange,
    label,
    ...props
  }: SliderFieldProps) => {
    const theme = useTheme();

    const currentValue = value || minValue;

    const fontColor = theme.palette.text;
    const themeColor = theme.palette[error ? "error" : color] || color;
    const disabledColor = theme.palette.disabled;
    const [currentText, setCurrentText] = useState(
      value?.toString() || minValue.toString()
    );

    const onChangeValue = useCallback(
      (newValue) => onChange?.(newValue),
      [onChange]
    );

    useEffect(() => {
      setCurrentText(value?.toString() || minValue.toString());
    }, [minValue, value]);

    const onChangeTextValue = useCallback(
      (newValue: string) => {
        if (!newValue) setCurrentText(newValue);
        const newIntValue = parseFloat(newValue);
        if (newIntValue <= maxValue && newIntValue >= minValue) {
          onChange?.(newIntValue);
        }
      },
      [maxValue, minValue, onChange]
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

    const inputStyle = useMemo(
      () => [
        {
          color: disabled ? disabledColor : fontColor,
          paddingVertical: 5,
          width: 25,
        },
        props.style,
      ],
      [disabled, disabledColor, fontColor, props.style]
    );

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
            <View style={styles.content}>
              <TextInput
                editable={!disabled}
                value={currentText}
                keyboardType="numeric"
                onChangeText={onChangeTextValue}
                style={inputStyle}
              />
              <Slider
                {...props}
                style={styles.slider}
                maxValue={maxValue}
                minValue={minValue}
                disabled={disabled}
                value={currentValue}
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
  content: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  slider: {
    flex: 1,
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
