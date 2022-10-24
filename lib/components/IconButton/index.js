import { jsx as _jsx } from "react/jsx-runtime";
import { memo, useMemo } from "react";
import { Button } from "../Button";
export const IconButton = memo(({ size = "medium", children, style, ...props }) => {
    const sizeStyle = useMemo(() => {
        if (size === "large")
            return { paddingHorizontal: 15, paddingVertical: 15 };
        if (size === "small")
            return { paddingHorizontal: 8, paddingVertical: 8 };
        return { paddingHorizontal: 10, paddingVertical: 10 };
    }, [size]);
    const containerStyle = useMemo(() => [
        { aspectRatio: 1, borderRadius: 999 },
        sizeStyle,
        style,
    ], [sizeStyle, style]);
    return (_jsx(Button, { ...props, size: size, style: containerStyle, children: children }));
});
IconButton.displayName = "IconButton";
