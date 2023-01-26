import React, { memo, useCallback, useEffect, useMemo, useRef } from "react";
import { StyleSheet, View } from "react-native";
import { useState } from "react";
import { TextField, TextFieldProps } from "../TextField";
import { Icon } from "../Icon";
import dayjs from "dayjs";
import { Calendar } from "../Calendar";
import { Popover } from "../Popover";
import { Button } from "../Button";
import { isMobile } from "../../utils";
import { useTheme } from "../../theme";
import customParseFormat from "dayjs/plugin/customParseFormat";
dayjs.extend(customParseFormat);

export type DateFieldProps = Omit<TextFieldProps, "value" | "onChange"> & {
  value?: Date | null;
  onChange?: (newValue?: Date | null) => void;
  format?: string;
  maxDate?: Date | null;
  minDate?: Date | null;
};

export const NativeDateField = memo<React.PropsWithChildren<DateFieldProps>>(
  ({ children, maxDate, minDate, color = "primary", onChange, value }) => {
    const theme = useTheme();
    const themeColor = theme.palette[color] || color;

    const valueText = dayjs(value).format("YYYY-MM-DD");
    const minText = minDate ? dayjs(minDate).format("YYYY-MM-DD") : undefined;
    const maxText = maxDate ? dayjs(maxDate).format("YYYY-MM-DD") : undefined;

    const onChangeValue = useCallback(
      (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.value) {
          const newValue = dayjs(event.target.value).toDate();
          onChange?.(newValue);
        } else {
          onChange?.(null);
        }
      },
      [onChange]
    );

    if (!isMobile) return <>{children}</>;

    return (
      <label htmlFor="date-select">
        <input
          style={styles.native}
          id="date-select"
          type="date"
          color={themeColor}
          value={valueText}
          min={minText}
          max={maxText}
          onChange={onChangeValue}
        />
        {children}
      </label>
    );
  }
);

export const DateField = memo<DateFieldProps>(
  ({
    disabled,
    value,
    color,
    format = "DD/MM/YYYY",
    onChange,
    maxDate,
    minDate,
    ...props
  }) => {
    const ref = useRef<View>(null);
    const [isOpen, setIsOpen] = useState(false);
    const [currentText, setText] = useState("");

    useEffect(() => {
      if (value) setText(dayjs(value).format(format));
    }, [value, format]);

    const openPopover = useCallback(() => setIsOpen(true), []);

    const closePopover = useCallback(() => setIsOpen(false), []);

    const onChangeText = useCallback(
      (newText: string) => {
        const needSlash =
          newText.length > currentText.length &&
          format.indexOf("/", newText.length) === newText.length;
        const newCurrentText = `${newText}${needSlash ? "/" : ""}`;

        const parsedDate = dayjs(newText, format);

        if (newCurrentText.length === format.length && parsedDate.isValid()) {
          console.log(newText, parsedDate.toDate());
          onChange?.(parsedDate.toDate());
        } else onChange?.(undefined);

        setText(newCurrentText);
      },
      [format, currentText.length, onChange]
    );

    const endIcon = useMemo(
      () => (
        <NativeDateField
          value={value}
          color={color}
          onChange={onChange}
          minDate={minDate}
          maxDate={maxDate}
          format={format}
        >
          <View ref={ref}>
            <Button disabled={disabled} onPress={openPopover} size="small">
              <Icon type="Ionicons" name="calendar" />
            </Button>
          </View>
        </NativeDateField>
      ),
      [value, color, onChange, minDate, maxDate, format, disabled, openPopover]
    );

    return (
      <>
        <TextField
          {...props}
          keyboardType="number-pad"
          placeholder={format}
          onChange={onChangeText}
          disabled={disabled}
          value={currentText}
          maxLength={format.length}
          endIcon={endIcon}
          color={color}
        />
        {!isMobile && (
          <Popover
            style={styles.popover}
            containerStyle={styles.container}
            parentRef={ref}
            open={isOpen}
            color={color}
            onClose={closePopover}
          >
            <Calendar
              {...props}
              color={color}
              minDate={minDate}
              maxDate={maxDate}
              disabled={disabled}
              interactive={!disabled}
              onSingleChange={onChange}
              value={value}
            />
          </Popover>
        )}
      </>
    );
  }
);
DateField.displayName = "DateField";

const styles = StyleSheet.create({
  container: { padding: 5 },
  popover: { maxWidth: 300 },
  native: {
    top: 0,
    left: 0,
    height: "100%",
    width: 50,
    position: "absolute",
    opacity: 0,
  },
});
