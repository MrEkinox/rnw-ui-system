"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IconButton = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const Button_1 = require("../Button");
exports.IconButton = (0, react_1.memo)(({ size = "medium", children, style, ...props }) => {
    const sizeStyle = (0, react_1.useMemo)(() => {
        if (size === "large")
            return { paddingHorizontal: 15, paddingVertical: 15 };
        if (size === "small")
            return { paddingHorizontal: 8, paddingVertical: 8 };
        return { paddingHorizontal: 10, paddingVertical: 10 };
    }, [size]);
    const containerStyle = (0, react_1.useMemo)(() => [
        { aspectRatio: 1, borderRadius: 999 },
        sizeStyle,
        style,
    ], [sizeStyle, style]);
    return ((0, jsx_runtime_1.jsx)(Button_1.Button, { ...props, size: size, style: containerStyle, children: children }));
});
exports.IconButton.displayName = "IconButton";
