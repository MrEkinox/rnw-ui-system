"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListItemIcon = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const react_1 = require("react");
exports.ListItemIcon = (0, react_1.memo)(({ children, ...props }) => {
    const containerStyle = (0, react_1.useMemo)(() => [{ marginRight: 10 }, props.style], [props.style]);
    return (0, jsx_runtime_1.jsx)(react_native_1.View, { style: containerStyle, children: children });
});
