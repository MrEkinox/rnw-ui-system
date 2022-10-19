import { jsx as _jsx } from "react/jsx-runtime";
import { useHover } from "../../hooks/useHover";
import { memo, useMemo, useCallback } from "react";
import { Pressable } from "react-native";
import { Icon } from "../Icon";
export const RatingItem = memo(({ iconProps, size, color, onPress, value, ...props }) => {
    const hover = useHover();
    const style = useMemo(() => [
        { opacity: hover.isActive ? 0.5 : 1 },
        props.style,
    ], [hover.isActive, props.style]);
    const onClick = useCallback(() => onPress?.(value), [onPress, value]);
    return (_jsx(Pressable, { onPress: onClick, ...hover.handlers, ...props, style: style, children: _jsx(Icon, { type: "Ionicons", name: "ios-star", color: color, size: size, ...iconProps }) }));
});
RatingItem.displayName = "RatingItem";
