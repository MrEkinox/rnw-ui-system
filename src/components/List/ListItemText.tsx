import { Typography, TypographyProps, TypographyVariant } from "../Typography";
import { View, ViewProps } from "react-native";
import React, { memo, useMemo } from "react";

export interface ListItemTextProps extends ViewProps {
  primary?: string | null;
  secondary?: string | null;
  primaryVariant?: TypographyVariant;
  secondaryVariant?: TypographyVariant;
  primaryProps?: TypographyProps;
  secondaryProps?: TypographyProps;
  noWrap?: boolean;
  loading?: boolean;
}

export const ListItemText = memo<ListItemTextProps>(
  ({
    primary,
    primaryProps,
    secondary,
    primaryVariant = "body1",
    secondaryVariant = "body2",
    secondaryProps,
    noWrap,
    loading,
    ...props
  }) => {
    const containerStyle = useMemo(
      () => [{ flex: 1 }, props.style],
      [props.style]
    );

    return (
      <View {...props} style={containerStyle}>
        {primary && (
          <Typography
            variant={primaryVariant}
            noWrap={noWrap}
            gutterBottom={!!secondary}
            loading={loading}
            width={100}
            {...primaryProps}
          >
            {primary}
          </Typography>
        )}
        {secondary && (
          <Typography
            variant={secondaryVariant}
            noWrap={noWrap}
            secondary
            loading={loading}
            width={200}
            {...secondaryProps}
          >
            {secondary}
          </Typography>
        )}
      </View>
    );
  }
);
