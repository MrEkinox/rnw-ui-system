import React, { memo, useCallback, useEffect, useMemo } from "react";
import { useState } from "react";
import { TextField, TextFieldProps } from "../TextField";
import parsePhoneNumber, { CountryCode, getCountries } from "libphonenumber-js";
import { Button } from "../Button";
import { CountryFlag } from "./CountryFlag";
import { SelectField, SelectFieldItemOptions } from "../SelectField";
import countryIntl from "./intl.json";
import { Typography } from "../Typography";
import { StyleSheet, View } from "react-native";

export interface PhoneFieldProps
  extends Omit<TextFieldProps, "value" | "onChange"> {
  lang?: "fr" | "en";
  getCountryLabel?: (code: CountryCode) => string;
  defaultCountry?: CountryCode;
  value?: string | null;
  onChange?: (newValue?: string) => void;
}

export const PhoneField = memo<PhoneFieldProps>(
  ({
    value = "",
    disabled,
    onChange,
    getCountryLabel,
    lang = "fr",
    defaultCountry = "FR",
    color = "primary",
    ...props
  }) => {
    const [currentCode, setCode] = useState(defaultCountry);
    const [currentValue, setCurrentValue] = useState("");

    const getParsedPhone = useCallback(
      (phone?: string | null, newCode = currentCode) => {
        if (!phone) return;
        const trimPhone = phone.replace(/ /g, "");
        const parsedPhone = parsePhoneNumber(trimPhone, newCode);
        const code = parsedPhone?.country || defaultCountry;
        const newPhone = parsedPhone?.formatInternational() || phone;

        return { value: newPhone, code, isValid: parsedPhone?.isValid() };
      },
      [currentCode, defaultCountry]
    );

    useEffect(() => {
      const parsedPhone = getParsedPhone(value);
      setCurrentValue(parsedPhone?.value || "");
      if (parsedPhone) setCode(parsedPhone.code);
    }, [getParsedPhone, value]);

    const onChangeText = useCallback(
      (newValue: string) => {
        const parsedPhone = getParsedPhone(newValue);
        if (parsedPhone) {
          setCurrentValue(parsedPhone.value);
          setCode(parsedPhone.code);
          if (parsedPhone.isValid) onChange?.(parsedPhone.value);
        } else {
          setCurrentValue("");
          onChange?.("");
        }
      },
      [getParsedPhone, onChange]
    );

    const onChangeCode = useCallback(
      (newCode: CountryCode) => {
        if (!newCode) return;
        setCode(newCode);
        setCurrentValue("");
        onChange?.("");
      },
      [onChange]
    );

    const countryWithLabel = useMemo(
      () =>
        getCountries().map((country) => ({
          value: country,
          label:
            getCountryLabel?.(country) ||
            countryIntl[country]?.[lang] ||
            country,
        })),
      [getCountryLabel, lang]
    );

    const renderItem = useCallback(
      (item: SelectFieldItemOptions) => (
        <View style={styles.flex}>
          <CountryFlag flagCode={item.value} />
          <Typography style={styles.text}>{item.label}</Typography>
        </View>
      ),
      []
    );

    const endIcon = useMemo(
      () => (
        <SelectField
          color={color}
          value={currentCode}
          items={countryWithLabel}
          searchable
          onChange={onChangeCode}
          renderItem={renderItem}
          disabled={disabled}
        >
          <Button
            pointerEvents="none"
            variant="fade"
            disabled={disabled}
            size="small"
            nativeID="selectCountry"
          >
            <CountryFlag flagCode={currentCode} />
          </Button>
        </SelectField>
      ),
      [color, countryWithLabel, currentCode, disabled, onChangeCode, renderItem]
    );

    return (
      <TextField
        nativeID="phoneField"
        endIcon={endIcon}
        {...props}
        color={color}
        textContentType="telephoneNumber"
        keyboardType="phone-pad"
        onChange={onChangeText}
        disabled={disabled}
        value={currentValue}
      />
    );
  }
);

const styles = StyleSheet.create({
  flex: {
    flexDirection: "row",
  },
  text: { marginLeft: 10 },
});

PhoneField.displayName = "PhoneField";
