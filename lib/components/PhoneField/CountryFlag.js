"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CountryFlag = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const country_flag_icons_1 = require("country-flag-icons");
const react_1 = require("react");
const react_native_1 = require("react-native");
exports.CountryFlag = (0, react_1.memo)(({ flagCode }) => {
    if ((0, country_flag_icons_1.hasFlag)(flagCode)) {
        const url = `http://purecatamphetamine.github.io/country-flag-icons/3x2/${flagCode}.svg`;
        return (0, jsx_runtime_1.jsx)("img", { alt: flagCode, style: styles.container, src: url });
    }
    return null;
});
exports.CountryFlag.displayName = "CountryFlag";
const styles = react_native_1.StyleSheet.create({
    container: {
        width: 20,
        borderRadius: 2,
        overflow: "hidden",
    },
});
