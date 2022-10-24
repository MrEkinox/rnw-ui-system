import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Grow } from "../Grow";
import { memo, useCallback, useMemo, useRef, useState } from "react";
import { Dimensions, Modal, Pressable, StyleSheet, View, } from "react-native";
import { useScrollLock } from "../../hooks/useScrollLock";
import { useTheme } from "../../theme";
import { Card } from "../Card";
import { Icon } from "../Icon";
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
    const { width, height } = Dimensions.get("window");
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
export const Popover = memo(({ parentRef, open, onClose, children, solo, containerStyle, arrowEnabled, animation, arrowPosition, color = "primary", style, ...props }) => {
    const [inAnimation, setInAnimation] = useState(false);
    const theme = useTheme();
    const popoverRef = useRef(null);
    const { setScrollLocked } = useScrollLock();
    const [position, setPosition] = useState({
        x: 0,
        y: 0,
        directionY: "bottom",
        directionX: "center",
    });
    const arrowColor = theme.palette[color] || color;
    const borderRadius = theme.borderRadius;
    const openPopover = useCallback(async () => {
        const newPosition = await getPosition(parentRef, popoverRef, solo);
        setScrollLocked(true);
        setPosition(newPosition);
    }, [parentRef, setScrollLocked, solo]);
    const dynamicArrowPosition = arrowPosition || position.directionX;
    const closePopover = useCallback(() => {
        setScrollLocked(false);
        onClose?.();
    }, [onClose, setScrollLocked]);
    const arrowStyle = useMemo(() => ({
        marginVertical: -15,
        marginHorizontal: 15,
        alignSelf: dynamicArrowPosition,
    }), [dynamicArrowPosition]);
    const arrowComponent = useMemo(() => {
        if (arrowEnabled === false)
            return null;
        return (_jsx(Icon, { type: "Ionicons", name: position.directionY === "bottom" ? "caret-up" : "caret-down", size: 30, color: arrowColor, style: arrowStyle }));
    }, [arrowEnabled, arrowColor, arrowStyle, position.directionY]);
    const popoverStyle = useMemo(() => [
        {
            position: "absolute",
            minHeight: 40,
            top: position.y,
            left: position.x,
            zIndex: +99,
        },
        style,
    ], [position.x, position.y, style]);
    const cardStyle = useMemo(() => [
        styles.card,
        { borderRadius },
        containerStyle,
    ], [borderRadius, containerStyle]);
    const transformOrigin = useMemo(() => {
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
    const Container = !solo ? Modal : View;
    return (_jsxs(Container, { nativeID: "popover", visible: true, onDismiss: closePopover, transparent: true, onRequestClose: closePopover, children: [!solo && _jsx(Pressable, { style: styles.backdrop, onPress: closePopover }), _jsx(View, { onLayout: openPopover, style: popoverStyle, ref: popoverRef, children: _jsxs(Grow, { visible: open, onAnimationState: setInAnimation, enabled: true, transformOrigin: transformOrigin, ...animation, children: [position.directionY === "bottom" && arrowComponent, _jsx(Card, { variant: "outlined", elevation: 10, color: color, style: cardStyle, ...props, children: children }), position.directionY === "top" && arrowComponent] }) })] }));
});
Popover.displayName = "Popover";
const styles = StyleSheet.create({
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
