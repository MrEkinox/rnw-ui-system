import { View, ViewProps } from "react-native";
import React, { memo, useMemo } from "react";

export const ListItemAction = memo<ViewProps>(({ children, ...props }) => {
  const containerStyle = useMemo(
    () => [{ marginLeft: 10 }, props.style],
    [props.style]
  );

  return <View style={containerStyle}>{children}</View>;
});
