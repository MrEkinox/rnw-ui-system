import React, { memo, useCallback, useEffect, useMemo, useRef } from "react";
import { FlatList, ListRenderItem, StyleSheet, View } from "react-native";
import { useState } from "react";
import { TextField } from "../TextField";
import { Popover } from "../Popover";
import { SelectFieldItem } from "../SelectField/SelectFieldItem";
import { SelectFieldItemOptions, SelectFieldProps } from "../SelectField";
import { useDebouncedCallback } from "use-debounce";
import { Card } from "../Card";

export type AutocompleteProps = {
  loading?: boolean;
  onSearch?: (value: string) => any;
  value?: string | null;
  solo?: boolean;
  solid?: boolean;
  delay?: number;
  onChange?: (newValue: string) => void;
} & Omit<SelectFieldProps, "multiple" | "value" | "onChange" | "searchable">;

const defaultOnSearch = (_: string) => {};

export const Autocomplete = memo<React.PropsWithChildren<AutocompleteProps>>(
  ({
    value,
    disabled,
    label,
    solo,
    delay = 500,
    items,
    solid,
    onChange,
    onSearch,
    renderItem,
    color = "primary",
    flatListProps,
    clearText,
    clearable,
    children,
    ...props
  }) => {
    const [currentText, setCurrentText] = useState("");
    const debounced = useDebouncedCallback(onSearch || defaultOnSearch, delay);
    const ref = useRef<View>(null);
    const [isFocused, setIsFocused] = useState(false);

    const currentItems = useMemo(() => {
      if (clearable && clearText) {
        return [{ label: clearText || "", value: "clear" }, ...items];
      }
      return items;
    }, [items, clearable, clearText]);

    useEffect(() => {
      setCurrentText(value || "");
    }, [value]);

    const onChangeText = useCallback(
      (newText: string) => {
        if (solo) {
          onChange?.(newText);
        }
        setCurrentText(newText);
        debounced(newText);
      },
      [debounced, onChange, solo]
    );

    const openPopover = useCallback(() => setIsFocused(true), []);

    const closePopover = useCallback(() => {
      if (!solo) setCurrentText(value || "");
      setIsFocused(false);
    }, [solo, value]);

    const onBlur = useCallback(() => {
      setTimeout(closePopover, 100);
    }, [closePopover]);

    const onSelect = useCallback(
      (newValue: string) => {
        onChange?.(newValue);
        closePopover();
      },
      [closePopover, onChange]
    );

    const renderOption: ListRenderItem<SelectFieldItemOptions> = useCallback(
      ({ item, index }) => {
        return (
          <SelectFieldItem
            key={index}
            color={color}
            value={item.value}
            onPress={onSelect}
          >
            {renderItem?.(item) || item.label}
          </SelectFieldItem>
        );
      },
      [color, onSelect, renderItem]
    );

    const filteredItems = useMemo(
      () =>
        currentItems?.filter(
          ({ label: label2 }) =>
            label2 !== currentText &&
            label2
              .toLowerCase()
              .normalize("NFD")
              .includes(currentText.toLowerCase().normalize("NFD"))
        ),
      [currentItems, currentText]
    );

    const content = (
      <FlatList
        data={filteredItems}
        removeClippedSubviews
        renderItem={renderOption}
        style={styles.list}
        {...flatListProps}
      />
    );

    return (
      <View ref={ref} style={styles.container}>
        {children || (
          <TextField
            {...props}
            label={label}
            disabled={disabled}
            color={color}
            value={currentText}
            onFocus={openPopover}
            onBlur={onBlur}
            containerStyle={
              solid && !!filteredItems.length && styles.noBorderInput
            }
            onChange={onChangeText}
          />
        )}
        {solid && !!filteredItems.length && (
          <Card variant="outlined" style={styles.card}>
            {content}
          </Card>
        )}
        {!solid && (
          <Popover
            solo
            parentRef={ref}
            open={isFocused && !!filteredItems.length}
          >
            {content}
          </Popover>
        )}
      </View>
    );
  }
);

Autocomplete.displayName = "Autocomplete";

const styles = StyleSheet.create({
  container: {
    zIndex: +1,
  },
  card: {
    borderTopWidth: 0,
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
  },
  noBorderInput: {
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
  },
  list: { maxHeight: 200, maxWidth: 300, overflow: "scroll" },
});
