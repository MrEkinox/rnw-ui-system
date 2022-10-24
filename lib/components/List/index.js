"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.List = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const react_native_1 = require("react-native");
const Typography_1 = require("../Typography");
exports.List = (0, react_1.memo)(({ children, header, footer, hearderTextProps, footerTextProps, ...props }) => {
    const headerComponent = (0, react_1.useMemo)(() => {
        if (typeof header !== "string")
            return header;
        return ((0, jsx_runtime_1.jsx)(Typography_1.Typography, { style: styles.padding, variant: "overline", ...hearderTextProps, children: header }));
    }, [header, hearderTextProps]);
    const footerComponent = (0, react_1.useMemo)(() => {
        if (typeof footer !== "string")
            return footer;
        return ((0, jsx_runtime_1.jsx)(Typography_1.Typography, { style: styles.padding, variant: "overline", ...footerTextProps, children: footer }));
    }, [footer, footerTextProps]);
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { nativeID: "List", ...props, children: [headerComponent, children, footerComponent] }));
});
exports.List.displayName = "List";
const styles = react_native_1.StyleSheet.create({
    padding: {
        padding: 10,
    },
});
