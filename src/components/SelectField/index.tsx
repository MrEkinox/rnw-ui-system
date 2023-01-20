import React, { memo, useCallback, useId, useMemo, useRef } from "react";
import {
  FlatList,
  FlatListProps,
  ListRenderItem,
  Pressable,
  StyleProp,
  StyleSheet,
  TextInput,
  TextStyle,
  View,
} from "react-native";
import { useState } from "react";
import { TextField, TextFieldProps } from "../TextField";
import { Icon } from "../Icon";
import { Popover } from "../Popover";
import { SelectFieldItem } from "./SelectFieldItem";
import { isMobile } from "../../utils";
import { useTheme } from "../../theme";
import { Typography } from "../Typography";
import { Checkbox } from "../Checkbox";

export interface SelectFieldItemOptions {
  label: string;
  value: string;
  disabled?: boolean;
  nativeID?: string;
}

export type SelectFieldProps<T = any> = {
  value: T;
  onChange?: (newValue?: T) => void;
  onHoverIn?: () => void;
  onHoverOut?: () => void;
  multiple?: boolean;
  flatListProps?: Omit<FlatListProps<any>, "data">;
  searchable?: boolean;
  clearText?: string;
  clearable?: boolean;
  items: SelectFieldItemOptions[];
  renderItem?: (item: SelectFieldItemOptions, selected?: boolean) => void;
} & Omit<TextFieldProps, "value" | "onChange">;

const getSelectedOptions = (
  selectedOptions: HTMLCollectionOf<HTMLOptionElement>
) => {
  return Array.from({ length: selectedOptions.length }).map(
    (_, index) => selectedOptions.item(index)?.value
  );
};

export const NativeSelectField = memo<
  React.PropsWithChildren<SelectFieldProps>
>(
  ({
    children,
    items,
    value,
    onChange,
    color = "primary",
    disabled,
    multiple,
  }) => {
    const theme = useTheme();
    const themeColor = theme.palette[color] || color;
    const id = useId();

    const onChangeValue = useCallback(
      (event: React.ChangeEvent<HTMLSelectElement>) => {
        const newValue = multiple
          ? getSelectedOptions(event.target.selectedOptions)
          : event.target.value;

        onChange?.(newValue);
      },
      [multiple, onChange]
    );

    if (!isMobile) return <>{children}</>;

    return (
      <label htmlFor={`select-${id}`} style={styles.nativeLabel}>
        <select
          disabled={disabled}
          id={`select-${id}`}
          value={value || "default"}
          color={themeColor}
          onChange={onChangeValue}
          multiple={multiple}
          style={styles.native}
        >
          {items?.map((item, index) => (
            <option
              disabled={item.disabled}
              key={index}
              id={item.nativeID}
              value={item.value}
            >
              {item.label}
            </option>
          ))}
        </select>
        {children}
      </label>
    );
  }
);

const stickyHeaderIndices = [0];

export const SelectField = memo<React.PropsWithChildren<SelectFieldProps>>(
  ({
    value,
    disabled,
    label,
    items,
    multiple,
    searchable,
    onChange,
    renderItem,
    color = "primary",
    flatListProps,
    clearText,
    clearable,
    children,
    style,
    onTouchStart,
    onTouchEnd,
    onHoverIn,
    onHoverOut,
    ...props
  }) => {
    const theme = useTheme();
    const [searchText, setSearchText] = useState("");
    const ref = useRef<View>(null);
    const [isOpen, setIsOpen] = useState(false);

    const emptyText = theme.intl.selectField.empty;
    const disabledColor = theme.palette.disabled;
    const themeColor = theme.palette[color] || color;
    const fontFamily = theme.typography.fontFamily;
    const backgroundColor = theme.palette.background.card;
    const fontColor = theme.palette.text;

    const currentItems = useMemo(() => {
      let newItems: SelectFieldItemOptions[] = items;
      if (clearable && clearText && !isMobile) {
        newItems = [{ label: clearText || "", value: "clear" }, ...newItems];
      }
      if (isMobile && !multiple) {
        newItems = [
          { label: label || "", value: "default", disabled: true },
          ...newItems,
        ];
      }
      return newItems;
    }, [items, clearable, clearText, multiple, label]);

    const currentText = useMemo(
      () =>
        currentItems
          .filter((item) => {
            if (typeof value === "string") return item.value === value;
            return value?.includes(item.value);
          })
          .map((item) => item.label)
          .join(", ") || "",
      [value, currentItems]
    );

    const onChangeValue = useCallback(
      (newValue: any) => {
        let newCurrentValue = newValue;
        if (newValue === value || newValue === "clear")
          newCurrentValue = undefined;

        if (multiple && value instanceof Array) {
          if (value?.includes(newValue)) {
            newCurrentValue = value.filter((cValue) => cValue !== newValue);
          } else if (newValue === "clear") {
            newCurrentValue = [];
          } else newCurrentValue = [...value, newValue];
        }

        if (!multiple) setIsOpen(false);
        onChange?.(newCurrentValue);
      },
      [value, multiple, onChange]
    );

    const getIsSelected = useCallback(
      (curValue: string) => {
        if (!value) return curValue === "clear";
        if (typeof value === "string") return value === curValue;
        return value?.findIndex((cValue) => cValue === curValue) !== -1;
      },
      [value]
    );

    const openPopover = useCallback(() => setIsOpen(true), []);

    const closePopover = useCallback(() => setIsOpen(false), []);

    const renderOption: ListRenderItem<SelectFieldItemOptions> = useCallback(
      ({ item, index }) => {
        const isSelected = getIsSelected(item.value);

        return (
          <SelectFieldItem
            key={index}
            selected={isSelected}
            color={color}
            nativeID={item.nativeID}
            disabled={item.disabled}
            value={item.value}
            onPress={onChangeValue}
          >
            {renderItem?.(item, isSelected) || multiple ? (
              <Checkbox
                disabled={item.disabled}
                value={isSelected}
                label={item.label}
                pointerEvents="none"
              />
            ) : (
              item.label
            )}
          </SelectFieldItem>
        );
      },
      [color, getIsSelected, multiple, onChangeValue, renderItem]
    );

    const endIcon = useMemo(
      () => <Icon type="Octicons" name="chevron-down" style={styles.icon} />,
      []
    );

    const inputStyle = useMemo(
      (): StyleProp<TextStyle> => ({
        color: fontColor,
        fontFamily,
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderBottomWidth: 1,
        borderBottomColor: themeColor,
        backgroundColor,
      }),
      [themeColor, backgroundColor, fontColor, fontFamily]
    );

    const searchInput = useMemo(() => {
      if (!searchable) return null;
      return (
        <TextInput
          autoFocus
          onChangeText={setSearchText}
          style={inputStyle}
          nativeID="searchCountryInput"
          value={searchText}
          placeholderTextColor={disabledColor}
          selectionColor={themeColor}
          placeholder="Rechercher"
        />
      );
    }, [searchable, disabledColor, inputStyle, searchText, themeColor]);

    const filteredItems = useMemo(
      () =>
        currentItems?.filter(({ label: label2 }) =>
          label2.toLowerCase().includes(searchText.toLowerCase())
        ),
      [currentItems, searchText]
    );

    const emptyList = useMemo(
      () => (
        <Typography variant="body2" style={styles.empty}>
          {emptyText}
        </Typography>
      ),
      [emptyText]
    );

    return (
      <NativeSelectField
        value={value}
        items={currentItems}
        color={color}
        disabled={disabled}
        onChange={onChange}
        multiple={multiple}
      >
        <Pressable
          disabled={disabled || isMobile}
          ref={ref}
          style={style}
          onPress={openPopover}
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
          onHoverIn={onHoverIn}
          onHoverOut={onHoverOut}
        >
          {children || (
            <TextField
              endIcon={endIcon}
              {...props}
              label={label}
              disabled={disabled}
              color={color}
              value={currentText}
              editable={false}
            />
          )}
          {!isMobile && (
            <Popover parentRef={ref} open={isOpen} onClose={closePopover}>
              <FlatList
                data={filteredItems}
                ListHeaderComponent={searchInput}
                stickyHeaderIndices={
                  searchable ? stickyHeaderIndices : undefined
                }
                removeClippedSubviews
                ListEmptyComponent={emptyList}
                renderItem={renderOption}
                style={styles.list}
                {...flatListProps}
              />
            </Popover>
          )}
        </Pressable>
      </NativeSelectField>
    );
  }
);

SelectField.displayName = "SelectField";

const styles = StyleSheet.create({
  list: { maxHeight: 200, maxWidth: 300, overflow: "scroll" },
  icon: {
    marginRight: 5,
    zIndex: +1,
  },
  empty: {
    padding: 15,
  },
  nativeLabel: {
    position: "relative",
  },
  native: {
    position: "absolute",
    top: 0,
    left: 0,
    height: "100%",
    width: "100%",
    opacity: 0,
  },
});
