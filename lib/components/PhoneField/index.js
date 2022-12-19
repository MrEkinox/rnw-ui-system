var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
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
export const PhoneField = memo((_a) => {
    var { value = "", disabled, onChange, getCountryLabel, lang = "fr", defaultCountry = "FR", color = "primary" } = _a, props = __rest(_a, ["value", "disabled", "onChange", "getCountryLabel", "lang", "defaultCountry", "color"]);
    const [currentCode, setCode] = useState(defaultCountry);
    const [currentValue, setCurrentValue] = useState("");
    const getParsedPhone = useCallback((phone, newCode = currentCode) => {
        if (!phone)
            return;
        const trimPhone = phone.replace(/ /g, "");
        const parsedPhone = parsePhoneNumber(trimPhone, newCode);
        const code = (parsedPhone === null || parsedPhone === void 0 ? void 0 : parsedPhone.country) || defaultCountry;
        const newPhone = (parsedPhone === null || parsedPhone === void 0 ? void 0 : parsedPhone.formatInternational()) || phone;
        return { value: newPhone, code, isValid: parsedPhone === null || parsedPhone === void 0 ? void 0 : parsedPhone.isValid() };
    }, [currentCode, defaultCountry]);
    useEffect(() => {
        const parsedPhone = getParsedPhone(value);
        setCurrentValue((parsedPhone === null || parsedPhone === void 0 ? void 0 : parsedPhone.value) || "");
        if (parsedPhone)
            setCode(parsedPhone.code);
    }, [getParsedPhone, value]);
    const onChangeText = useCallback((newValue) => {
        const parsedPhone = getParsedPhone(newValue);
        if (parsedPhone) {
            setCurrentValue(parsedPhone.value);
            setCode(parsedPhone.code);
            if (parsedPhone.isValid)
                onChange === null || onChange === void 0 ? void 0 : onChange(parsedPhone.value);
        }
        else {
            setCurrentValue("");
            onChange === null || onChange === void 0 ? void 0 : onChange("");
        }
    }, [getParsedPhone, onChange]);
    const onChangeCode = useCallback((newCode) => {
        if (!newCode)
            return;
        setCode(newCode);
        setCurrentValue("");
        onChange === null || onChange === void 0 ? void 0 : onChange("");
    }, [onChange]);
    const countryWithLabel = useMemo(() => getCountries().map((country) => {
        var _a;
        return ({
            value: country,
            label: (getCountryLabel === null || getCountryLabel === void 0 ? void 0 : getCountryLabel(country)) ||
                ((_a = countryIntl[country]) === null || _a === void 0 ? void 0 : _a[lang]) ||
                country,
        });
    }), [getCountryLabel, lang]);
    const renderItem = useCallback((item) => (_jsxs(View, Object.assign({ style: styles.flex }, { children: [_jsx(CountryFlag, { flagCode: item.value }), _jsx(Typography, Object.assign({ style: styles.text }, { children: item.label }))] }))), []);
    const endIcon = useMemo(() => (_jsx(SelectField, Object.assign({ color: color, value: currentCode, items: countryWithLabel, searchable: true, onChange: onChangeCode, renderItem: renderItem, disabled: disabled }, { children: _jsx(Button, Object.assign({ pointerEvents: "none", variant: "fade", disabled: disabled, size: "small", nativeID: "selectCountry" }, { children: _jsx(CountryFlag, { flagCode: currentCode }) })) }))), [color, countryWithLabel, currentCode, disabled, onChangeCode, renderItem]);
    return (_jsx(TextField, Object.assign({ nativeID: "phoneField", endIcon: endIcon }, props, { color: color, textContentType: "telephoneNumber", keyboardType: "phone-pad", onChange: onChangeText, disabled: disabled, value: currentValue })));
});
const styles = StyleSheet.create({
    flex: {
        flexDirection: "row",
    },
    text: { marginLeft: 10 },
});
PhoneField.displayName = "PhoneField";
