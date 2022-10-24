"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PhoneField = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const react_2 = require("react");
const TextField_1 = require("../TextField");
const libphonenumber_js_1 = __importStar(require("libphonenumber-js"));
const Button_1 = require("../Button");
const CountryFlag_1 = require("./CountryFlag");
const SelectField_1 = require("../SelectField");
const intl_json_1 = __importDefault(require("./intl.json"));
const Typography_1 = require("../Typography");
const react_native_1 = require("react-native");
exports.PhoneField = (0, react_1.memo)(({ value = "", disabled, onChange, getCountryLabel, lang = "fr", defaultCountry = "FR", color = "primary", ...props }) => {
    const [currentCode, setCode] = (0, react_2.useState)(defaultCountry);
    const [currentValue, setCurrentValue] = (0, react_2.useState)("");
    const getParsedPhone = (0, react_1.useCallback)((phone, newCode = currentCode) => {
        if (!phone)
            return;
        const trimPhone = phone.replace(/ /g, "");
        const parsedPhone = (0, libphonenumber_js_1.default)(trimPhone, newCode);
        const code = parsedPhone?.country || defaultCountry;
        const newPhone = parsedPhone?.formatInternational() || phone;
        return { value: newPhone, code, isValid: parsedPhone?.isValid() };
    }, [currentCode, defaultCountry]);
    (0, react_1.useEffect)(() => {
        const parsedPhone = getParsedPhone(value);
        setCurrentValue(parsedPhone?.value || "");
        if (parsedPhone)
            setCode(parsedPhone.code);
    }, [getParsedPhone, value]);
    const onChangeText = (0, react_1.useCallback)((newValue) => {
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
    const onChangeCode = (0, react_1.useCallback)((newCode) => {
        if (!newCode)
            return;
        setCode(newCode);
        setCurrentValue("");
        onChange?.("");
    }, [onChange]);
    const countryWithLabel = (0, react_1.useMemo)(() => (0, libphonenumber_js_1.getCountries)().map((country) => ({
        value: country,
        label: getCountryLabel?.(country) ||
            intl_json_1.default[country]?.[lang] ||
            country,
    })), [getCountryLabel, lang]);
    const renderItem = (0, react_1.useCallback)((item) => ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: styles.flex, children: [(0, jsx_runtime_1.jsx)(CountryFlag_1.CountryFlag, { flagCode: item.value }), (0, jsx_runtime_1.jsx)(Typography_1.Typography, { style: styles.text, children: item.label })] })), []);
    const endIcon = (0, react_1.useMemo)(() => ((0, jsx_runtime_1.jsx)(SelectField_1.SelectField, { color: color, value: currentCode, items: countryWithLabel, searchable: true, onChange: onChangeCode, renderItem: renderItem, children: (0, jsx_runtime_1.jsx)(Button_1.Button, { pointerEvents: "none", variant: "fade", disabled: disabled, size: "small", nativeID: "selectCountry", children: (0, jsx_runtime_1.jsx)(CountryFlag_1.CountryFlag, { flagCode: currentCode }) }) })), [color, countryWithLabel, currentCode, disabled, onChangeCode, renderItem]);
    return ((0, jsx_runtime_1.jsx)(TextField_1.TextField, { nativeID: "phoneField", endIcon: endIcon, ...props, color: color, textContentType: "telephoneNumber", keyboardType: "phone-pad", onChange: onChangeText, disabled: disabled, value: currentValue }));
});
const styles = react_native_1.StyleSheet.create({
    flex: {
        flexDirection: "row",
    },
    text: { marginLeft: 10 },
});
exports.PhoneField.displayName = "PhoneField";
