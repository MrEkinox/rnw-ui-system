"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CardContent = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const react_native_1 = require("react-native");
exports.CardContent = (0, react_1.memo)(({ children, style, ...props }) => {
    const containerStyle = (0, react_1.useMemo)(() => [
        {
            paddingLeft: 20,
            paddingRight: 20,
            paddingTop: 20,
            paddingBottom: 20,
        },
        style,
    ], [style]);
    return ((0, jsx_runtime_1.jsx)(react_native_1.View, { ...props, style: containerStyle, children: children }));
});
exports.CardContent.displayName = "CardContent";
