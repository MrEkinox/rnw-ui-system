import React, { memo, useEffect, useMemo } from "react";
import { Animated, ViewProps } from "react-native";

export interface GrowProps extends ViewProps {
  enabled?: boolean;
  visible?: boolean;
  duration?: number;
  delay?: number;
  transformOrigin?: string;
  easing?: (value: number) => number;
  onAnimationState?: (state: boolean) => void;
}

export const Grow = memo<React.PropsWithChildren<GrowProps>>(
  ({
    visible = true,
    children,
    delay,
    enabled,
    transformOrigin = "50% 0",
    easing,
    duration = 200,
    onAnimationState,
    ...props
  }) => {
    const animation = useMemo(() => new Animated.Value(0), []);

    useEffect(() => {
      if (enabled)
        Animated.timing(animation, {
          toValue: visible ? 1 : 0,
          duration,
          delay,
          easing,
          useNativeDriver: false,
        }).start(() => onAnimationState?.(visible));
    }, [
      animation,
      enabled,
      delay,
      easing,
      duration,
      visible,
      onAnimationState,
    ]);

    const style = useMemo(
      () => [
        enabled && { transform: [{ scale: animation }], transformOrigin },
        props.style,
      ],
      [enabled, animation, props.style, transformOrigin]
    );

    return (
      <Animated.View nativeID="grow" {...props} style={style}>
        {children}
      </Animated.View>
    );
  }
);
Grow.displayName = "Grow";
