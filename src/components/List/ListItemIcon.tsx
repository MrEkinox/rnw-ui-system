import { View, ViewProps } from "react-native";
import React, { memo, useMemo } from "react";

interface ListItemIconProps extends ViewProps {
  marginRight?: number;
}

export const ListItemIcon = memo<ListItemIconProps>(
  ({ children, marginRight = 10, ...props }) => {
    const containerStyle = useMemo(
      () => [{ marginRight }, props.style],
      [props.style, marginRight]
    );

    return <View style={containerStyle}>{children}</View>;
  }
);
