import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { memo, useMemo } from "react";
import { Pressable, View, ActivityIndicator, StyleSheet, } from "react-native";
import { useTheme } from "../../theme";
import ColorJS from "color";
import { useHover } from "../../hooks/useHover";
import { renderChildren, renderIcon } from "../../utils";
import { Typography } from "../Typography";
const getIconStyle = (position, size) => {
    if (size === "small") {
        return position === "start"
            ? { marginRight: 5, marginLeft: 0 }
            : { marginRight: 0, marginLeft: 5 };
    }
    return position === "start"
        ? { marginRight: 10, marginLeft: -5 }
        : { marginRight: -5, marginLeft: 10 };
};
export const Button = memo(({ children, color = "primary", disabled, endIcon, startIcon, fullWidth, loadingPosition = "center", loadingIndicator, size = "medium", variant = "contained", loading, style = {}, ...props }) => {
    const theme = useTheme();
    const hover = useHover();
    const isDisabled = disabled || loading;
    const fontStyle = theme.typography.button;
    const borderRadius = theme.borderRadius;
    const disabledColor = theme.palette.disabled;
    const themeColor = isDisabled
        ? disabledColor
        : theme.palette[color] || color;
    const containedColor = ColorJS(ColorJS(themeColor).isDark() ? "#FFF" : "#000")
        .fade(isDisabled ? 0.5 : 0)
        .toString();
    const themeLoadingIndicator = useMemo(() => loadingIndicator || _jsx(ActivityIndicator, { color: containedColor }), [loadingIndicator, containedColor]);
    const borderWidth = variant === "outlined" ? 2 : 0;
    const buttonStyle = useMemo(() => {
        if (variant === "outlined") {
            return {
                color: themeColor,
                borderColor: themeColor,
                borderWidth,
                borderStyle: "solid",
                backgroundColor: hover.isActive
                    ? ColorJS(themeColor).fade(0.7).toString()
                    : undefined,
            };
        }
        if (variant === "hovered") {
            return {
                color: themeColor,
                backgroundColor: hover.isActive
                    ? ColorJS(themeColor).fade(0.7).toString()
                    : undefined,
            };
        }
        if (variant === "fade") {
            return {
                color: themeColor,
                opacity: hover.isActive ? 0.5 : 1,
                backgroundColor: ColorJS(themeColor).fade(0.7).toString(),
            };
        }
        if (variant === "text") {
            return {
                color: themeColor,
                opacity: hover.isActive ? 0.5 : 1,
            };
        }
        return {
            backgroundColor: hover.isActive
                ? ColorJS(themeColor).fade(0.2).toString()
                : themeColor,
            color: containedColor,
        };
    }, [variant, hover.isActive, themeColor, containedColor, borderWidth]);
    const sizeStyle = useMemo(() => {
        if (variant === "text")
            return {};
        if (size === "large") {
            return {
                borderRadius,
                paddingHorizontal: 25 - borderWidth,
                paddingVertical: 15 - borderWidth,
                fontSize: 25,
            };
        }
        if (size === "small") {
            return {
                borderRadius: borderRadius / 2,
                paddingHorizontal: 10 - borderWidth,
                paddingVertical: 5 - borderWidth,
                fontSize: 17,
            };
        }
        return {
            borderRadius: borderRadius / 1.5,
            paddingHorizontal: 20 - borderWidth,
            paddingVertical: 10 - borderWidth,
            fontSize: 20,
        };
    }, [borderWidth, borderRadius, variant, size]);
    const isLoadingStart = loadingPosition === "start" && loading;
    const isLoadingCenter = loadingPosition === "center" && loading;
    const isLoadingEnd = loadingPosition === "end" && loading;
    const iconProps = useMemo(() => ({ color: buttonStyle?.["color"], size: sizeStyle?.["fontSize"] }), [buttonStyle, sizeStyle]);
    const content = useMemo(() => typeof children === "string" ? (_jsx(Typography, { color: iconProps.color, style: fontStyle, selectable: false, align: "center", children: children })) : (renderChildren(children, iconProps)), [children, fontStyle, iconProps]);
    const startIconComponent = useMemo(() => {
        if (startIcon || isLoadingStart) {
            return (_jsx(View, { style: getIconStyle("start", size), children: isLoadingStart
                    ? themeLoadingIndicator
                    : renderIcon(startIcon, iconProps) }));
        }
        return null;
    }, [iconProps, isLoadingStart, size, startIcon, themeLoadingIndicator]);
    const endIconComponent = useMemo(() => {
        if (endIcon || isLoadingEnd) {
            return (_jsx(View, { style: getIconStyle("end", size), children: isLoadingEnd
                    ? themeLoadingIndicator
                    : renderIcon(endIcon, iconProps) }));
        }
        return null;
    }, [endIcon, iconProps, isLoadingEnd, size, themeLoadingIndicator]);
    const containerStyle = useMemo(() => [
        styles.container,
        !fullWidth && { width: "fit-content" },
        sizeStyle,
        buttonStyle,
        style,
    ], [buttonStyle, fullWidth, sizeStyle, style]);
    return (_jsxs(Pressable, { ...hover.handlers, nativeID: "button", ...props, disabled: isDisabled, style: containerStyle, children: [startIconComponent, isLoadingCenter ? themeLoadingIndicator : content, endIconComponent] }));
});
Button.displayName = "Button";
const styles = StyleSheet.create({
    container: {
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row",
    },
});
