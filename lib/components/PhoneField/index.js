import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { memo, useCallback, useEffect, useMemo } from "react";
import { useState } from "react";
import { TextField } from "../TextField";
import parsePhoneNumber, { getCountries } from "libphonenumber-js";
import { Button } from "../Button";
import { CountryFlag } from "./CountryFlag";
import { SelectField } from "../SelectField";
import countryIntl from "./intl.json";
import { Typography } from "../Typography";
import { StyleSheet, View } from "react-native";
export const PhoneField = memo(({ value = "", disabled, onChange, getCountryLabel, lang = "fr", defaultCountry = "FR", color = "primary", ...props }) => {
    const [currentCode, setCode] = useState(defaultCountry);
    const [currentValue, setCurrentValue] = useState("");
    const getParsedPhone = useCallback((phone, newCode = currentCode) => {
        if (!phone)
            return;
        const trimPhone = phone.replace(/ /g, "");
        const parsedPhone = parsePhoneNumber(trimPhone, newCode);
        const code = parsedPhone?.country || defaultCountry;
        const newPhone = parsedPhone?.formatInternational() || phone;
        return { value: newPhone, code, isValid: parsedPhone?.isValid() };
    }, [currentCode, defaultCountry]);
    useEffect(() => {
        const parsedPhone = getParsedPhone(value);
        setCurrentValue(parsedPhone?.value || "");
        if (parsedPhone)
            setCode(parsedPhone.code);
    }, [getParsedPhone, value]);
    const onChangeText = useCallback((newValue) => {
        const parsedPhone = getParsedPhone(newValue);
        if (parsedPhone) {
            setCurrentValue(parsedPhone.value);
            setCode(parsedPhone.code);
            if (parsedPhone.isValid)
                onChange?.(parsedPhone.value);
        }
        else {
            setCurrentValue("");
            onChange?.("");
        }
    }, [getParsedPhone, onChange]);
    const onChangeCode = useCallback((newCode) => {
        if (!newCode)
            return;
        setCode(newCode);
        setCurrentValue("");
        onChange?.("");
    }, [onChange]);
    const countryWithLabel = useMemo(() => getCountries().map((country) => ({
        value: country,
        label: getCountryLabel?.(country) ||
            countryIntl[country]?.[lang] ||
            country,
    })), [getCountryLabel, lang]);
    const renderItem = useCallback((item) => (_jsxs(View, { style: styles.flex, children: [_jsx(CountryFlag, { flagCode: item.value }), _jsx(Typography, { style: styles.text, children: item.label })] })), []);
    const endIcon = useMemo(() => (_jsx(SelectField, { color: color, value: currentCode, items: countryWithLabel, searchable: true, onChange: onChangeCode, renderItem: renderItem, children: _jsx(Button, { pointerEvents: "none", variant: "fade", disabled: disabled, size: "small", nativeID: "selectCountry", children: _jsx(CountryFlag, { flagCode: currentCode }) }) })), [color, countryWithLabel, currentCode, disabled, onChangeCode, renderItem]);
    return (_jsx(TextField, { nativeID: "phoneField", endIcon: endIcon, ...props, color: color, textContentType: "telephoneNumber", keyboardType: "phone-pad", onChange: onChangeText, disabled: disabled, value: currentValue }));
});
const styles = StyleSheet.create({
    flex: {
        flexDirection: "row",
    },
    text: { marginLeft: 10 },
});
PhoneField.displayName = "PhoneField";
