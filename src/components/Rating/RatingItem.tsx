import { useHover } from "../../hooks/useHover";
import { Colors } from "../../theme";
import React, { memo, useMemo, useCallback } from "react";
import { PressableProps, StyleProp, ViewStyle, Pressable } from "react-native";
import { IconProps, Icon } from "../Icon";

export interface RatingItemProps
  extends Omit<PressableProps, "style" | "onPress"> {
  iconProps?: IconProps;
  style?: StyleProp<ViewStyle>;
  size?: number;
  color?: Colors;
  value: number;
  onPress?: (value: number) => void;
}

export const RatingItem = memo<RatingItemProps>(
  ({ iconProps, size, color, onPress, value, ...props }) => {
    const hover = useHover();

    const style = useMemo(
      (): StyleProp<ViewStyle> => [
        { opacity: hover.isActive ? 0.5 : 1 },
        props.style,
      ],
      [hover.isActive, props.style]
    );

    const onClick = useCallback(() => onPress?.(value), [onPress, value]);

    return (
      <Pressable onPress={onClick} {...hover.handlers} {...props} style={style}>
        <Icon
          type="Ionicons"
          name="ios-star"
          color={color}
          size={size}
          {...iconProps}
        />
      </Pressable>
    );
  }
);

RatingItem.displayName = "RatingItem";
