import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { memo, useMemo } from "react";
import { StyleSheet, View } from "react-native";
import { Typography } from "../Typography";
export const List = memo(({ children, header, footer, hearderTextProps, footerTextProps, ...props }) => {
    const headerComponent = useMemo(() => {
        if (typeof header !== "string")
            return header;
        return (_jsx(Typography, { style: styles.padding, variant: "overline", ...hearderTextProps, children: header }));
    }, [header, hearderTextProps]);
    const footerComponent = useMemo(() => {
        if (typeof footer !== "string")
            return footer;
        return (_jsx(Typography, { style: styles.padding, variant: "overline", ...footerTextProps, children: footer }));
    }, [footer, footerTextProps]);
    return (_jsxs(View, { nativeID: "List", ...props, children: [headerComponent, children, footerComponent] }));
});
List.displayName = "List";
const styles = StyleSheet.create({
    padding: {
        padding: 10,
    },
});
