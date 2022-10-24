"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Popover = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const Grow_1 = require("../Grow");
const react_1 = require("react");
const react_native_1 = require("react-native");
const useScrollLock_1 = require("../../hooks/useScrollLock");
const theme_1 = require("../../theme");
const Card_1 = require("../Card");
const Icon_1 = require("../Icon");
const getDimensions = (ref) => {
    return new Promise((resolve) => {
        if (ref?.current) {
            ref.current?.measureInWindow((x, y, width, height) => resolve({ x, y, width, height }));
        }
        else
            resolve({ x: 0, y: 0, width: 0, height: 0 });
    });
};
const getPosition = async (parentRef, popoverRef, solo) => {
    const { width, height } = react_native_1.Dimensions.get("window");
    const { x: parentX, y: parentY, width: parentWidth, height: parentHeight, } = await getDimensions(parentRef);
    const { width: childWidth, height: childHeight } = await getDimensions(popoverRef);
    let directionY = "bottom";
    let y = 0;
    let x = parentX;
    let directionX = "center";
    if (parentY + childHeight <= height) {
        y = solo ? 0 : parentY + parentHeight;
        directionY = "bottom";
    }
    else if (parentY - childHeight >= 0) {
        y = solo ? -(childHeight + parentHeight) : parentY - childHeight;
        directionY = "top";
    }
    else if (!solo) {
        y = height / 2 - childHeight / 2;
        directionY = "center";
    }
    if (parentX + parentWidth / 2 - childWidth / 2 < width) {
        x = solo ? 0 : parentX + parentWidth / 2 - childWidth / 2;
        directionX = "center";
    }
    else if (parentX + childWidth >= width) {
        x = parentX + parentWidth / 2 - childWidth / 2;
        directionX = "flex-end";
    }
    else if (parentX - childWidth <= 0) {
        x = parentX + childWidth / 2 + parentWidth / 2;
        directionX = "flex-start";
    }
    return { x, y, directionY, directionX };
};
exports.Popover = (0, react_1.memo)(({ parentRef, open, onClose, children, solo, containerStyle, arrowEnabled, animation, arrowPosition, color = "primary", style, ...props }) => {
    const [inAnimation, setInAnimation] = (0, react_1.useState)(false);
    const theme = (0, theme_1.useTheme)();
    const popoverRef = (0, react_1.useRef)(null);
    const { setScrollLocked } = (0, useScrollLock_1.useScrollLock)();
    const [position, setPosition] = (0, react_1.useState)({
        x: 0,
        y: 0,
        directionY: "bottom",
        directionX: "center",
    });
    const arrowColor = theme.palette[color] || color;
    const borderRadius = theme.borderRadius;
    const openPopover = (0, react_1.useCallback)(async () => {
        const newPosition = await getPosition(parentRef, popoverRef, solo);
        setScrollLocked(true);
        setPosition(newPosition);
    }, [parentRef, setScrollLocked, solo]);
    const dynamicArrowPosition = arrowPosition || position.directionX;
    const closePopover = (0, react_1.useCallback)(() => {
        setScrollLocked(false);
        onClose?.();
    }, [onClose, setScrollLocked]);
    const arrowStyle = (0, react_1.useMemo)(() => ({
        marginVertical: -15,
        marginHorizontal: 15,
        alignSelf: dynamicArrowPosition,
    }), [dynamicArrowPosition]);
    const arrowComponent = (0, react_1.useMemo)(() => {
        if (arrowEnabled === false)
            return null;
        return ((0, jsx_runtime_1.jsx)(Icon_1.Icon, { type: "Ionicons", name: position.directionY === "bottom" ? "caret-up" : "caret-down", size: 30, color: arrowColor, style: arrowStyle }));
    }, [arrowEnabled, arrowColor, arrowStyle, position.directionY]);
    const popoverStyle = (0, react_1.useMemo)(() => [
        {
            position: "absolute",
            minHeight: 40,
            top: position.y,
            left: position.x,
            zIndex: +99,
        },
        style,
    ], [position.x, position.y, style]);
    const cardStyle = (0, react_1.useMemo)(() => [
        styles.card,
        { borderRadius },
        containerStyle,
    ], [borderRadius, containerStyle]);
    const transformOrigin = (0, react_1.useMemo)(() => {
        let positionX = "50%";
        if (dynamicArrowPosition === "flex-start")
            positionX = "10%";
        else if (dynamicArrowPosition === "flex-end")
            positionX = "90%";
        const positionY = position.directionY === "bottom" ? "0%" : "100%";
        return `${positionX} ${positionY}`;
    }, [position.directionY, dynamicArrowPosition]);
    if (!open && !inAnimation)
        return null;
    const Container = !solo ? react_native_1.Modal : react_native_1.View;
    return ((0, jsx_runtime_1.jsxs)(Container, { nativeID: "popover", visible: true, onDismiss: closePopover, transparent: true, onRequestClose: closePopover, children: [!solo && (0, jsx_runtime_1.jsx)(react_native_1.Pressable, { style: styles.backdrop, onPress: closePopover }), (0, jsx_runtime_1.jsx)(react_native_1.View, { onLayout: openPopover, style: popoverStyle, ref: popoverRef, children: (0, jsx_runtime_1.jsxs)(Grow_1.Grow, { visible: open, onAnimationState: setInAnimation, enabled: true, transformOrigin: transformOrigin, ...animation, children: [position.directionY === "bottom" && arrowComponent, (0, jsx_runtime_1.jsx)(Card_1.Card, { variant: "outlined", elevation: 10, color: color, style: cardStyle, ...props, children: children }), position.directionY === "top" && arrowComponent] }) })] }));
});
exports.Popover.displayName = "Popover";
const styles = react_native_1.StyleSheet.create({
    card: {
        minHeight: 40,
        overflow: "hidden",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.25,
        shadowRadius: 20,
    },
    backdrop: {
        width: "100%",
        height: "100%",
    },
});
