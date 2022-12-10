import React, { memo, useCallback, useMemo } from "react";
import {
  Animated,
  LayoutChangeEvent,
  ScrollView,
  ScrollViewProps,
  ViewStyle,
} from "react-native";
import { Colors, useTheme } from "../../theme";
import { useState } from "react";
import { useEffect } from "react";
import { useThemeStyle } from "../../hooks/useThemeStyle";
import { Tab } from "./Tab";

export interface TabItem {
  label: React.ReactNode | string;
  value: any;
}

export interface TabsProps extends ScrollViewProps {
  disabled?: boolean;
  value: any;
  items: TabItem[];
  color?: Colors;
  onChange?: (newValue: any) => void;
  size?: number;
}

export const Tabs = memo<TabsProps>(
  ({
    value,
    items,
    disabled,
    onChange,
    color = "primary",
    style,
    size,
    ...props
  }) => {
    const theme = useTheme();

    const indicatorPositionAnim = useMemo(() => new Animated.Value(0), []);
    const indicatorWidthAnim = useMemo(() => new Animated.Value(0), []);
    const [tabsWidth, setTabsWidth] = useState<{ [K: number]: number }>({});

    const borderRadius = theme.borderRadius;
    const themeColor = theme.palette[color] || color;

    const selectedIndex = useMemo(
      () => items.findIndex((item) => item.value === value),
      [value, items]
    );

    useEffect(() => {
      const indicatorWidth = tabsWidth[selectedIndex] || 0;

      const indicatorPosition =
        Object.values(tabsWidth)
          .filter((_, index) => index <= selectedIndex)
          .reduce((acc, cur) => acc + cur, 0) - indicatorWidth;

      Animated.timing(indicatorWidthAnim, {
        toValue: indicatorWidth,
        duration: 200,
        useNativeDriver: false,
      }).start();
      Animated.timing(indicatorPositionAnim, {
        toValue: indicatorPosition,
        duration: 200,
        useNativeDriver: false,
      }).start();
    }, [indicatorPositionAnim, indicatorWidthAnim, selectedIndex, tabsWidth]);

    const onChangeIndex = useCallback(
      (newValue) => onChange?.(newValue),
      [onChange]
    );

    const containerStyle = useThemeStyle(
      (curTheme) => [
        {
          alignItems: "center",
          width: "fit-content",
          borderRadius: curTheme.borderRadius,
          backgroundColor: curTheme.palette.background.card,
        },
        style,
      ],
      [style]
    );

    const colorStyle = useMemo(
      (): Animated.WithAnimatedObject<ViewStyle> => ({
        height: "100%",
        position: "absolute",
        left: indicatorPositionAnim,
        width: indicatorWidthAnim,
        backgroundColor: themeColor,
        borderRadius,
      }),
      [borderRadius, indicatorPositionAnim, indicatorWidthAnim, themeColor]
    );

    const onLayout = useCallback(
      (tabValue, event: LayoutChangeEvent) => {
        const newItemIndex = items.findIndex((item) => item.value === tabValue);
        if (newItemIndex === -1) return;
        setTabsWidth((nextTabsWidth) => ({
          ...nextTabsWidth,
          [newItemIndex]: event.nativeEvent.layout.width,
        }));
      },
      [items]
    );

    return (
      <ScrollView horizontal {...props} contentContainerStyle={containerStyle}>
        {selectedIndex !== -1 && <Animated.View style={colorStyle} />}
        {items.map((item, index) => (
          <Tab
            value={item.value}
            disabled={disabled}
            key={index}
            size={size}
            selected={index === selectedIndex}
            color={themeColor}
            onPress={onChangeIndex}
            onLayout={onLayout}
          >
            {item.label}
          </Tab>
        ))}
      </ScrollView>
    );
  }
);

Tabs.displayName = "Tabs";
