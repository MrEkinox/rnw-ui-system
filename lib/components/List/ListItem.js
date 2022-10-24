import { jsx as _jsx } from "react/jsx-runtime";
import { StyleSheet, View } from "react-native";
import { memo, useMemo } from "react";
export const ListItem = memo(({ disabledPadding, disableGutters, children, ...props }) => {
    const containerStyle = useMemo(() => [
        styles.container,
        props.style,
        !disabledPadding && { paddingVertical: 5 },
        !disableGutters && { paddingHorizontal: 5 },
    ], [props.style, disabledPadding, disableGutters]);
    return (_jsx(View, { ...props, style: containerStyle, children: children }));
});
const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "center",
    },
});
