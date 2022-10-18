import { StyleSheet, View, ViewProps } from "react-native";
import React, { memo, useMemo } from "react";

export interface ListItemProps extends ViewProps {
  disabledPadding?: boolean;
  disableGutters?: boolean;
}

export const ListItem = memo<ListItemProps>(
  ({ disabledPadding, disableGutters, children, ...props }) => {
    const containerStyle = useMemo(
      () => [
        styles.container,
        props.style,
        !disabledPadding && { paddingVertical: 5 },
        !disableGutters && { paddingHorizontal: 5 },
      ],
      [props.style, disabledPadding, disableGutters]
    );

    return (
      <View {...props} style={containerStyle}>
        {children}
      </View>
    );
  }
);

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
  },
});
