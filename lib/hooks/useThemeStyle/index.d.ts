/// <reference types="react" />
import { DefaultThemeOptions } from "../../theme";
import { Animated, StyleProp, TextStyle, ViewStyle } from "react-native";
export declare function useThemeStyle<T extends StyleProp<TextStyle | ViewStyle> | Animated.WithAnimatedObject<ViewStyle | TextStyle>>(callback: (theme: DefaultThemeOptions) => T, deps?: React.DependencyList): T;
