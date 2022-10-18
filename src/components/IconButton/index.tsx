import React, { memo, useMemo } from "react";
import { StyleProp, TextStyle, ViewStyle } from "react-native";
import { Button, ButtonProps } from "../Button";

export interface IconButtonProps
  extends Omit<
    ButtonProps,
    "endIcon" | "startIcon" | "loadingIndicator" | "loadingPosition"
  > {
  variant?: "contained" | "outlined" | "hovered" | "fade";
}

export const IconButton = memo<React.PropsWithChildren<IconButtonProps>>(
  ({ size = "medium", children, style, ...props }) => {
    const sizeStyle = useMemo((): StyleProp<ViewStyle> => {
      if (size === "large")
        return { paddingHorizontal: 15, paddingVertical: 15 };
      if (size === "small") return { paddingHorizontal: 8, paddingVertical: 8 };
      return { paddingHorizontal: 10, paddingVertical: 10 };
    }, [size]);

    const containerStyle = useMemo(
      (): StyleProp<ViewStyle | TextStyle> => [
        { aspectRatio: 1, borderRadius: 999 },
        sizeStyle,
        style,
      ],
      [sizeStyle, style]
    );

    return (
      <Button {...props} size={size} style={containerStyle}>
        {children}
      </Button>
    );
  }
);
IconButton.displayName = "IconButton";
