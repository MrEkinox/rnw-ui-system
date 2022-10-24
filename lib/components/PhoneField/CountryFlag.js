import { jsx as _jsx } from "react/jsx-runtime";
import { hasFlag } from "country-flag-icons";
import { memo } from "react";
import { StyleSheet } from "react-native";
export const CountryFlag = memo(({ flagCode }) => {
    if (hasFlag(flagCode)) {
        const url = `http://purecatamphetamine.github.io/country-flag-icons/3x2/${flagCode}.svg`;
        return _jsx("img", { alt: flagCode, style: styles.container, src: url });
    }
    return null;
});
CountryFlag.displayName = "CountryFlag";
const styles = StyleSheet.create({
    container: {
        width: 20,
        borderRadius: 2,
        overflow: "hidden",
    },
});
