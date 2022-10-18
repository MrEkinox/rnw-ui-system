"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PhoneField = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var react_2 = require("react");
var TextField_1 = require("../TextField");
var libphonenumber_js_1 = __importStar(require("libphonenumber-js"));
var Button_1 = require("../Button");
var CountryFlag_1 = require("./CountryFlag");
var SelectField_1 = require("../SelectField");
var intl_json_1 = __importDefault(require("./intl.json"));
var Typography_1 = require("../Typography");
var react_native_1 = require("react-native");
exports.PhoneField = (0, react_1.memo)(function (_a) {
    var _b = _a.value, value = _b === void 0 ? "" : _b, disabled = _a.disabled, onChange = _a.onChange, getCountryLabel = _a.getCountryLabel, _c = _a.lang, lang = _c === void 0 ? "fr" : _c, _d = _a.defaultCountry, defaultCountry = _d === void 0 ? "FR" : _d, _e = _a.color, color = _e === void 0 ? "primary" : _e, props = __rest(_a, ["value", "disabled", "onChange", "getCountryLabel", "lang", "defaultCountry", "color"]);
    var _f = (0, react_2.useState)(defaultCountry), currentCode = _f[0], setCode = _f[1];
    var _g = (0, react_2.useState)(""), currentValue = _g[0], setCurrentValue = _g[1];
    var getParsedPhone = (0, react_1.useCallback)(function (phone, newCode) {
        if (newCode === void 0) { newCode = currentCode; }
        if (!phone)
            return;
        var trimPhone = phone.replace(/ /g, "");
        var parsedPhone = (0, libphonenumber_js_1.default)(trimPhone, newCode);
        var code = (parsedPhone === null || parsedPhone === void 0 ? void 0 : parsedPhone.country) || defaultCountry;
        var newPhone = (parsedPhone === null || parsedPhone === void 0 ? void 0 : parsedPhone.formatInternational()) || phone;
        return { value: newPhone, code: code, isValid: parsedPhone === null || parsedPhone === void 0 ? void 0 : parsedPhone.isValid() };
    }, [currentCode, defaultCountry]);
    (0, react_1.useEffect)(function () {
        var parsedPhone = getParsedPhone(value);
        setCurrentValue((parsedPhone === null || parsedPhone === void 0 ? void 0 : parsedPhone.value) || "");
        if (parsedPhone)
            setCode(parsedPhone.code);
    }, [getParsedPhone, value]);
    var onChangeText = (0, react_1.useCallback)(function (newValue) {
        var parsedPhone = getParsedPhone(newValue);
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
    var onChangeCode = (0, react_1.useCallback)(function (newCode) {
        if (!newCode)
            return;
        setCode(newCode);
        setCurrentValue("");
        onChange === null || onChange === void 0 ? void 0 : onChange("");
    }, [onChange]);
    var countryWithLabel = (0, react_1.useMemo)(function () {
        return (0, libphonenumber_js_1.getCountries)().map(function (country) {
            var _a;
            return ({
                value: country,
                label: (getCountryLabel === null || getCountryLabel === void 0 ? void 0 : getCountryLabel(country)) ||
                    ((_a = intl_json_1.default[country]) === null || _a === void 0 ? void 0 : _a[lang]) ||
                    country,
            });
        });
    }, [getCountryLabel, lang]);
    var renderItem = (0, react_1.useCallback)(function (item) { return ((0, jsx_runtime_1.jsxs)(react_native_1.View, __assign({ style: styles.flex }, { children: [(0, jsx_runtime_1.jsx)(CountryFlag_1.CountryFlag, { flagCode: item.value }), (0, jsx_runtime_1.jsx)(Typography_1.Typography, __assign({ style: styles.text }, { children: item.label }))] }))); }, []);
    var endIcon = (0, react_1.useMemo)(function () { return ((0, jsx_runtime_1.jsx)(SelectField_1.SelectField, __assign({ color: color, value: currentCode, items: countryWithLabel, searchable: true, onChange: onChangeCode, renderItem: renderItem }, { children: (0, jsx_runtime_1.jsx)(Button_1.Button, __assign({ pointerEvents: "none", variant: "fade", disabled: disabled, size: "small", nativeID: "selectCountry" }, { children: (0, jsx_runtime_1.jsx)(CountryFlag_1.CountryFlag, { flagCode: currentCode }) })) }))); }, [color, countryWithLabel, currentCode, disabled, onChangeCode, renderItem]);
    return ((0, jsx_runtime_1.jsx)(TextField_1.TextField, __assign({ nativeID: "phoneField", endIcon: endIcon }, props, { color: color, textContentType: "telephoneNumber", keyboardType: "phone-pad", onChange: onChangeText, disabled: disabled, value: currentValue })));
});
var styles = react_native_1.StyleSheet.create({
    flex: {
        flexDirection: "row",
    },
    text: { marginLeft: 10 },
});
exports.PhoneField.displayName = "PhoneField";
