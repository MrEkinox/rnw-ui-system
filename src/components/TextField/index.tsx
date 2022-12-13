import React, { memo, useCallback, useEffect, useMemo, useRef } from "react";
import {
  Animated,
  NativeSyntheticEvent,
  StyleProp,
  StyleSheet,
  TextInput,
  TextInputContentSizeChangeEventData,
  TextInputFocusEventData,
  TextInputProps,
  TextProps,
  TextStyle,
  View,
  ViewStyle,
} from "react-native";
import { useTheme, Colors } from "../../theme";
import { useState } from "react";
import { Typography, TypographyProps } from "../Typography";
import ColorJS from "color";
import { computeBorderRadius, renderIcon } from "../../utils";
import { useThemeStyle } from "../../hooks/useThemeStyle";
import { Badge } from "../Badge";

export interface TextFieldHelperProps extends TypographyProps {
  error?: boolean;
}

export const TextFieldHelper = memo<
  React.PropsWithChildren<TextFieldHelperProps>
>(({ error, color, children }) => {
  const style = useMemo((): StyleProp<TextStyle> => ({ padding: 5 }), []);

  if (typeof children !== "string") return null;

  return (
    <Typography variant="caption" color={error ? "error" : color} style={style}>
      {children}
    </Typography>
  );
});
TextFieldHelper.displayName = "TextFieldHelper";

export interface TextFieldLabelProps extends TextProps {
  required?: boolean;
  isActive?: boolean;
  disabled?: boolean;
  height?: number;
  color?: Colors;
  error?: boolean;
}

export const TextFieldLabel = memo<
  React.PropsWithChildren<TextFieldLabelProps>
>(
  ({
    required,
    isActive,
    height,
    disabled,
    error,
    color = "primary",
    children,
  }) => {
    const theme = useTheme();
    const fontFamily = theme.typography.fontFamily;
    const backgroundColor = theme.palette.background.card;
    const disabledColor = theme.palette.disabled;
    const fontColor = theme.palette.text;
    const animation = useRef(new Animated.Value(isActive ? 1 : 0)).current;

    const themeColor = theme.palette[error ? "error" : color] || color;

    const currentColor = disabled
      ? disabledColor
      : animation.interpolate({
          inputRange: [0, 1],
          outputRange: [ColorJS(fontColor).fade(0.7).toString(), themeColor],
        });

    const fontSize = animation.interpolate({
      inputRange: [0, 1],
      outputRange: [15, 12],
    });

    const labelPosition = animation.interpolate({
      inputRange: [0, 1],
      outputRange: [0, -(height || 20)],
    });

    useEffect(() => {
      Animated.timing(animation, {
        toValue: isActive ? 1 : 0,
        duration: 150,
        useNativeDriver: false,
      }).start();
    }, [animation, isActive]);

    const style = useMemo(
      (): Animated.WithAnimatedObject<TextStyle> => ({
        fontFamily,
        position: "absolute",
        backgroundColor: backgroundColor,
        color: currentColor,
        padding: 5,
        marginLeft: -5,
        zIndex: -1,
        fontSize,
        fontWeight: "600",
        marginTop: labelPosition,
      }),
      [backgroundColor, currentColor, fontFamily, fontSize, labelPosition]
    );

    if (typeof children !== "string") return null;

    return (
      <Animated.Text style={style} numberOfLines={1}>
        {required ? `${children}*` : children}
      </Animated.Text>
    );
  }
);
TextFieldLabel.displayName = "TextFieldLabel";

export interface TextFieldProps extends Omit<TextInputProps, "onChange"> {
  disabled?: boolean;
  color?: Colors;
  label?: string;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  required?: boolean;
  error?: boolean;
  helperText?: any;
  onChange?: (newValue: string) => void;
  containerStyle?: StyleProp<ViewStyle>;
  autoGrow?: boolean;
  name?: string;
  displayMaxCount?: boolean;
}

export const TextField = memo<TextFieldProps>(
  ({
    value = "",
    disabled,
    onChange,
    label,
    editable = true,
    startIcon,
    endIcon,
    required,
    displayMaxCount,
    error,
    onBlur,
    onFocus,
    helperText,
    containerStyle,
    autoGrow,
    color = "primary",
    name,
    keyboardType,
    ...props
  }) => {
    const theme = useTheme();

    const inputRef = useRef<TextInput>(null);
    const [isFocused, setIsFocused] = useState(false);
    const [height, setHeight] = useState<"auto" | number>("auto");
    const labelIsActive = !!value || isFocused || !!props.placeholder;

    const canEdit = editable && disabled !== true;

    const fontColor = theme.palette.text;
    const disabledColor = theme.palette.disabled;
    const themeColor = theme.palette[error ? "error" : color] || color;

    const currentColor = disabled ? disabledColor : themeColor;

    const onChangeValue = useCallback(
      (newValue: string) => {
        if (newValue.length) {
          if (keyboardType === "numeric" && !newValue.match(/^\d+$/)) return;
          if (keyboardType === "phone-pad" && !newValue.match(/^[+ \d]+$/))
            return;
        }
        onChange?.(newValue);
        if (!newValue) setHeight("auto");
      },
      [onChange, keyboardType]
    );

    const memoStartIcon = useMemo(
      () => renderIcon(startIcon, { color: currentColor }),
      [currentColor, startIcon]
    );

    const memoEndIcon = useMemo(
      () => renderIcon(endIcon, { color: currentColor }),
      [currentColor, endIcon]
    );

    const onMemoBlur = useCallback(
      (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
        if (canEdit) setIsFocused(false);
        onBlur?.(e);
      },
      [canEdit, onBlur]
    );

    const onMemoFocus = useCallback(
      (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
        if (canEdit) setIsFocused(true);
        onFocus?.(e);
      },
      [canEdit, onFocus]
    );

    const style = useThemeStyle(
      (curTheme) => [
        styles.container,
        computeBorderRadius(curTheme.borderRadius / 1.5),
        { borderColor: currentColor },
        containerStyle,
      ],
      [containerStyle, currentColor]
    );

    const inputStyle = useMemo(
      () => [
        { color: disabled ? disabledColor : fontColor, paddingVertical: 5 },
        { height: autoGrow ? height : "100%" },
        props.style,
      ],
      [autoGrow, disabled, disabledColor, fontColor, height, props.style]
    );

    const flexStyle = useMemo(
      () => [styles.flex, { paddingHorizontal: 10 / 2 + 5 }],
      []
    );

    const onContentSizeChange = useCallback(
      (e: NativeSyntheticEvent<TextInputContentSizeChangeEventData>) => {
        if (autoGrow) setHeight(e.nativeEvent.contentSize.height);
      },
      [autoGrow]
    );

    const placeholderTextColor = ColorJS(fontColor).fade(0.7).toString();

    const maxCountText = useMemo(
      () =>
        displayMaxCount && props.maxLength ? (
          <Badge
            style={styles.countText}
            color={currentColor}
            textVariant="overline"
          >
            {`${value.length}/${props.maxLength}`}
          </Badge>
        ) : null,
      [currentColor, displayMaxCount, props.maxLength, value.length]
    );

    return (
      <>
        <View style={style}>
          {memoStartIcon}
          <View style={flexStyle}>
            <TextFieldLabel
              required={required}
              isActive={labelIsActive}
              disabled={disabled}
              color={color}
              error={error}
            >
              {label}
            </TextFieldLabel>
            <TextInput
              ref={inputRef}
              accessibilityLabel={label}
              nativeID={name}
              {...props}
              keyboardType={keyboardType}
              onChangeText={onChangeValue}
              onBlur={onMemoBlur}
              onFocus={onMemoFocus}
              style={inputStyle}
              onContentSizeChange={onContentSizeChange}
              placeholderTextColor={placeholderTextColor}
              value={value}
              editable={canEdit}
              selectionColor={themeColor}
            />
          </View>
          {memoEndIcon || maxCountText}
        </View>
        <TextFieldHelper color={color} error={error}>
          {helperText}
        </TextFieldHelper>
      </>
    );
  }
);

TextField.displayName = "TextField";

const styles = StyleSheet.create({
  flex: { flex: 1, height: "100%", alignSelf: "flex-start" },
  container: {
    borderWidth: 2,
    padding: 5,
    minHeight: 44,
    alignItems: "center",
    flexDirection: "row",
  },
  countText: {
    position: "absolute",
    right: 10,
    bottom: 10,
  },
});
