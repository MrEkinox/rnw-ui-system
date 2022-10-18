import { hasFlag } from "country-flag-icons";
import React, { memo } from "react";
import { StyleSheet } from "react-native";

export interface CountryFlagProps {
  flagCode: string;
}

export const CountryFlag = memo<CountryFlagProps>(({ flagCode }) => {
  if (hasFlag(flagCode)) {
    const url = `http://purecatamphetamine.github.io/country-flag-icons/3x2/${flagCode}.svg`;
    return <img alt={flagCode} style={styles.container} src={url} />;
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
