import { jsx as _jsx } from "react/jsx-runtime";
import { View } from "react-native";
import { memo, useMemo } from "react";
export const ListItemIcon = memo(({ children, ...props }) => {
    const containerStyle = useMemo(() => [{ marginRight: 10 }, props.style], [props.style]);
    return _jsx(View, { style: containerStyle, children: children });
});
