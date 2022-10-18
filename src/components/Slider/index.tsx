import React, {
  memo,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  PanResponder,
  PanResponderGestureState,
  StyleProp,
  View,
  ViewProps,
  ViewStyle,
} from "react-native";
import { Colors, useTheme } from "../../theme";
import ColorJS from "color";
import { useScrollLock } from "../../hooks/useScrollLock";
import { SliderThumb } from "./SliderThumb";
import { SliderStepDots } from "./SliderStepDots";
import { SliderTrack } from "./SliderTrack";

//TODO Add context system

export type DefaultSliderProps = {
  minValue: number;
  maxValue: number;
  color?: Colors;
  step?: number;
  marks?: boolean;
  track?: boolean;
  disabled?: boolean;
  getLabel?: (value: number) => React.ReactNode | string;
};

export type SingleSliderProps = DefaultSliderProps & {
  value: number;
  onChange: (newValue: any) => void;
};

export type MultipleSliderProps = DefaultSliderProps & {
  value: number[];
  onChange: (newValue: any) => void;
};

export type SliderProps = (SingleSliderProps | MultipleSliderProps) & ViewProps;

export const Slider = memo<SliderProps>(
  ({
    color = "primary",
    value,
    maxValue,
    minValue,
    step = 1,
    disabled,
    marks,
    track = true,
    getLabel,
    onChange,
    style,
    ...props
  }) => {
    const theme = useTheme();

    const borderRadius = theme.borderRadius;
    const disabledColor = theme.palette.disabled;
    const themeColor: string = disabled
      ? disabledColor
      : theme.palette[color] || color;

    const containerRef = useRef<View>(null);
    const { setScrollLocked } = useScrollLock();
    const [interactionIndex, setInteractionIndex] = useState(-1);
    const [currentValues, setValues] = useState<number[]>([]);

    useEffect(() => {
      const arrayValues = (typeof value === "number" ? [value] : value).map(
        (curValue) =>
          curValue < minValue || curValue > maxValue ? minValue : curValue
      );
      setValues(arrayValues);
    }, [maxValue, minValue, value]);

    const getInteractiveThumb = useCallback(
      (newValue: number) =>
        currentValues.reduce(
          (acc, cValue, index) => {
            if (Math.abs(cValue - newValue) < Math.abs(acc.value - newValue))
              return { index, value: cValue };
            return acc;
          },
          { index: 0, value: 0 }
        ),
      [currentValues]
    );

    const onMoveEnd = useCallback(() => {
      setInteractionIndex(-1);
      const steppedCurrendValues = currentValues.map(
        (cValue) => Math.round(cValue / step) * step
      );
      if (typeof value === "number") {
        onChange(steppedCurrendValues[0]);
      } else onChange(steppedCurrendValues);
    }, [currentValues, onChange, step, value]);

    const onMove = useCallback(
      (_, { moveX, x0 }: PanResponderGestureState) => {
        containerRef.current?.measureInWindow(
          (containerPositionX, y, width) => {
            const x = (moveX || x0) - containerPositionX;
            let newValue = minValue + ((maxValue - minValue) * x) / width;
            if (newValue < minValue) {
              newValue = minValue;
            } else if (newValue > maxValue) {
              newValue = maxValue;
            }

            const interactiveThumb = getInteractiveThumb(newValue);
            setInteractionIndex(interactiveThumb.index);
            setValues((curValues) =>
              curValues.map((cValue, index) =>
                index === interactiveThumb.index ? newValue : cValue
              )
            );
          }
        );
      },
      [getInteractiveThumb, maxValue, minValue]
    );

    const panResponder = useMemo(
      () =>
        PanResponder.create({
          onStartShouldSetPanResponder: () => disabled !== true,
          onMoveShouldSetPanResponder: () => disabled !== true,
          onPanResponderTerminationRequest: () => false,
          onPanResponderGrant: onMove,
          onPanResponderEnd: onMoveEnd,
          onPanResponderMove: onMove,
        }),
      [disabled, onMove, onMoveEnd]
    );

    useEffect(() => {
      setScrollLocked(interactionIndex !== -1);
    }, [interactionIndex, setScrollLocked]);

    const containerStyle = useMemo(
      (): StyleProp<ViewStyle> => [
        {
          borderRadius,
          backgroundColor: ColorJS(themeColor).fade(0.5).toString(),
          height: 10,
          width: "100%",
          // @ts-ignore
          cursor: disabled ? undefined : "pointer",
          justifyContent: "center",
        },
        style,
      ],
      [borderRadius, disabled, style, themeColor]
    );

    return (
      <View
        ref={containerRef}
        {...props}
        style={containerStyle}
        {...panResponder.panHandlers}
      >
        {track && (
          <SliderTrack
            color={themeColor}
            minValue={minValue}
            maxValue={maxValue}
            inInteraction={interactionIndex !== -1}
            values={currentValues}
            step={step}
          />
        )}
        {marks && (
          <SliderStepDots minValue={minValue} maxValue={maxValue} step={step} />
        )}
        {currentValues.map((cValue, index) => (
          <SliderThumb
            key={index}
            getLabel={getLabel}
            inInteraction={interactionIndex === index}
            color={themeColor}
            minValue={minValue}
            maxValue={maxValue}
            value={cValue}
            step={step}
          />
        ))}
      </View>
    );
  }
);
Slider.displayName = "Slider";
