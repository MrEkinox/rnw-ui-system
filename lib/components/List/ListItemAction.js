import { jsx as _jsx } from "react/jsx-runtime";
import { View } from "react-native";
import { memo, useMemo } from "react";
export const ListItemAction = memo(({ children, ...props }) => {
    const containerStyle = useMemo(() => [{ marginLeft: 10 }, props.style], [props.style]);
    return _jsx(View, { style: containerStyle, children: children });
});
