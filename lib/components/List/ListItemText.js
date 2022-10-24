"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListItemText = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const Typography_1 = require("../Typography");
const react_native_1 = require("react-native");
const react_1 = require("react");
exports.ListItemText = (0, react_1.memo)(({ primary, primaryProps, secondary, primaryVariant = "body1", secondaryVariant = "body2", secondaryProps, noWrap, ...props }) => {
    const containerStyle = (0, react_1.useMemo)(() => [{ flex: 1 }, props.style], [props.style]);
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { ...props, style: containerStyle, children: [primary && ((0, jsx_runtime_1.jsx)(Typography_1.Typography, { variant: primaryVariant, noWrap: noWrap, gutterBottom: true, ...primaryProps, children: primary })), secondary && ((0, jsx_runtime_1.jsx)(Typography_1.Typography, { variant: secondaryVariant, noWrap: noWrap, secondary: true, ...secondaryProps, children: secondary }))] }));
});
