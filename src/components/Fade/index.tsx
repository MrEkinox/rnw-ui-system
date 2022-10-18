import React, { memo, useEffect, useMemo } from "react";
import { Animated, ViewProps } from "react-native";

export interface FadeProps extends ViewProps {
  enabled?: boolean;
  visible?: boolean;
  duration?: number;
  delay?: number;
  easing?: (value: number) => number;
  onAnimationState?: (state: boolean) => void;
}

export const Fade = memo<React.PropsWithChildren<FadeProps>>(
  ({
    visible = true,
    children,
    delay,
    enabled,
    easing,
    duration = 100,
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
      () => [enabled && { opacity: animation }, props.style],
      [enabled, animation, props.style]
    );

    return (
      <Animated.View nativeID="Fade" {...props} style={style}>
        {children}
      </Animated.View>
    );
  }
);
Fade.displayName = "Fade";
