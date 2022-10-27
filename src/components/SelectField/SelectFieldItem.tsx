import { Typography } from "../Typography";
import { useHover } from "../../hooks/useHover";
import { useThemeStyle } from "../../hooks/useThemeStyle";
import { Colors } from "../../theme";
import React, { memo, useCallback } from "react";
import ColorJS from "color";
import { PressableProps, Pressable } from "react-native";

export interface SelectFieldItemProps extends Omit<PressableProps, "onPress"> {
  selected?: boolean;
  color?: Colors;
  value: string;
  onPress?: (value: string) => void;
}

export const SelectFieldItem = memo<
  React.PropsWithChildren<SelectFieldItemProps>
>(
  ({
    children,
    disabled,
    value,
    onPress,
    color = "primary",
    selected,
    ...props
  }) => {
    const hover = useHover();

    const style = useThemeStyle(
      (theme) => {
        const selectedColor = ColorJS(theme.palette[color] || color)
          .fade(0.8)
          .toString();
        return {
          paddingHorizontal: 20,
          paddingVertical: 10,
          backgroundColor: selected ? selectedColor : undefined,
          opacity: hover.isActive || disabled ? 0.5 : 1,
        };
      },
      [color, selected, hover.isActive, disabled]
    );

    const onClick = useCallback(() => onPress?.(value), [onPress, value]);

    return (
      <Pressable
        disabled={disabled}
        onPress={onClick}
        {...hover.handlers}
        {...props}
        style={style}
      >
        {typeof children === "string" ? (
          <Typography>{children}</Typography>
        ) : (
          children
        )}
      </Pressable>
    );
  }
);
SelectFieldItem.displayName = "SelectFieldItem";
