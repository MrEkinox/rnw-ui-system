import { jsx as _jsx } from "react/jsx-runtime";
import { memo, useMemo } from "react";
import { View } from "react-native";
export const CardContent = memo(({ children, style, ...props }) => {
    const containerStyle = useMemo(() => [
        {
            paddingLeft: 20,
            paddingRight: 20,
            paddingTop: 20,
            paddingBottom: 20,
        },
        style,
    ], [style]);
    return (_jsx(View, { ...props, style: containerStyle, children: children }));
});
CardContent.displayName = "CardContent";
