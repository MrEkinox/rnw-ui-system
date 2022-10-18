import React, { memo, useMemo } from "react";
import { ViewProps, StyleProp, ViewStyle, View } from "react-native";

export const CardContent = memo<React.PropsWithChildren<ViewProps>>(
  ({ children, style, ...props }) => {
    const containerStyle = useMemo(
      (): StyleProp<ViewStyle> => [
        {
          paddingLeft: 20,
          paddingRight: 20,
          paddingTop: 20,
          paddingBottom: 20,
        },
        style,
      ],
      [style]
    );

    return (
      <View {...props} style={containerStyle}>
        {children}
      </View>
    );
  }
);

CardContent.displayName = "CardContent";
