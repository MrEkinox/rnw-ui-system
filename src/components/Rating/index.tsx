import React, { memo, useCallback, useEffect, useMemo, useState } from "react";
import { StyleProp, View, ViewProps, ViewStyle } from "react-native";
import { Colors, useTheme } from "../../theme";
import { IconProps } from "../Icon";
import { RatingItem } from "./RatingItem";

export interface RatingProps extends ViewProps {
  size?: number;
  color?: Colors;
  value?: number;
  spacing?: number;
  onChange?: (newValue: number) => void;
  touchable?: boolean;
  iconProps?: IconProps;
}

export const Rating = memo<RatingProps>(
  ({
    size = 50,
    value = 0,
    onChange,
    touchable,
    spacing = 5,
    iconProps,
    color = "primary",
    style,
    ...props
  }) => {
    const theme = useTheme();
    const [currentValue, setCurrentValue] = useState(value);

    useEffect(() => {
      if (value !== currentValue) setCurrentValue(value);
    }, [value, currentValue]);

    const themeColor = theme.palette[color] || color;
    const disabledColor = theme.palette.disabled;

    const onChangeValue = useCallback(
      (newValue: number) => {
        setCurrentValue(newValue);
        onChange?.(newValue);
      },
      [onChange]
    );

    const containerStyle = useMemo(
      (): StyleProp<ViewStyle> => [{ flexDirection: "row" }, style],
      [style]
    );

    const getStyle = useCallback(
      (index: number) => ({ paddingLeft: index > 0 ? spacing : 0 }),
      [spacing]
    );

    return (
      <View nativeID="rating" {...props} style={containerStyle}>
        {Array.from({ length: 5 }).map((_, index) => (
          <RatingItem
            key={index}
            disabled={!touchable}
            value={index + 1}
            onPress={onChangeValue}
            iconProps={iconProps}
            size={size}
            color={currentValue >= index + 1 ? themeColor : disabledColor}
            style={getStyle(index)}
          />
        ))}
      </View>
    );
  }
);

Rating.displayName = "Rating";
