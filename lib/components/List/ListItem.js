"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListItem = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const react_1 = require("react");
exports.ListItem = (0, react_1.memo)(({ disabledPadding, disableGutters, children, ...props }) => {
    const containerStyle = (0, react_1.useMemo)(() => [
        styles.container,
        props.style,
        !disabledPadding && { paddingVertical: 5 },
        !disableGutters && { paddingHorizontal: 5 },
    ], [props.style, disabledPadding, disableGutters]);
    return ((0, jsx_runtime_1.jsx)(react_native_1.View, { ...props, style: containerStyle, children: children }));
});
const styles = react_native_1.StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "center",
    },
});
