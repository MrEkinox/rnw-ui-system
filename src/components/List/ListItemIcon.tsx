import { View, ViewProps } from "react-native";
import React, { memo, useMemo } from "react";

export const ListItemIcon = memo<ViewProps>(({ children, ...props }) => {
  const containerStyle = useMemo(
    () => [{ marginRight: 10 }, props.style],
    [props.style]
  );

  return <View style={containerStyle}>{children}</View>;
});
