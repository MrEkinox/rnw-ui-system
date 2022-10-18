import React, { memo, useMemo } from "react";
import { StyleSheet, View, ViewProps } from "react-native";
import { Typography, TypographyProps } from "../Typography";

// List with padding, header, footer
// ListItem with primaryAction, textPrimary, textSecondary, textPrimaryProps, textSecondaryProps, secondaryAction, disabledPadding,disableGutters

export interface ListProps extends ViewProps {
  header?: React.ReactNode | string;
  hearderTextProps?: TypographyProps;
  footer?: React.ReactNode | string;
  footerTextProps?: TypographyProps;
}

export const List = memo<React.PropsWithChildren<ListProps>>(
  ({
    children,
    header,
    footer,
    hearderTextProps,
    footerTextProps,
    ...props
  }) => {
    const headerComponent = useMemo(() => {
      if (typeof header !== "string") return header;

      return (
        <Typography
          style={styles.padding}
          variant="overline"
          {...hearderTextProps}
        >
          {header}
        </Typography>
      );
    }, [header, hearderTextProps]);

    const footerComponent = useMemo(() => {
      if (typeof footer !== "string") return footer;

      return (
        <Typography
          style={styles.padding}
          variant="overline"
          {...footerTextProps}
        >
          {footer}
        </Typography>
      );
    }, [footer, footerTextProps]);

    return (
      <View nativeID="List" {...props}>
        {headerComponent}
        {children}
        {footerComponent}
      </View>
    );
  }
);
List.displayName = "List";

const styles = StyleSheet.create({
  padding: {
    padding: 10,
  },
});
