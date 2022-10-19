import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Typography } from "../Typography";
import { View } from "react-native";
import { memo, useMemo } from "react";
export const ListItemText = memo(({ primary, primaryProps, secondary, primaryVariant = "body1", secondaryVariant = "body2", secondaryProps, noWrap, ...props }) => {
    const containerStyle = useMemo(() => [{ flex: 1 }, props.style], [props.style]);
    return (_jsxs(View, { ...props, style: containerStyle, children: [primary && (_jsx(Typography, { variant: primaryVariant, noWrap: noWrap, gutterBottom: true, ...primaryProps, children: primary })), secondary && (_jsx(Typography, { variant: secondaryVariant, noWrap: noWrap, secondary: true, ...secondaryProps, children: secondary }))] }));
});
