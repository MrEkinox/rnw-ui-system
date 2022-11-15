var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { memo, useCallback, useEffect, useMemo, useState } from "react";
import { Animated, Modal, Pressable, ScrollView, StyleSheet, } from "react-native";
import { useScrollLock } from "../../hooks/useScrollLock";
import { Card } from "../Card";
import ColorJS from "color";
import { CardContent } from "../Card/CardContent";
export const Dialog = memo((_a) => {
    var { children, onClose, open = false, animationType, style, width, contentStyle, presentationStyle } = _a, props = __rest(_a, ["children", "onClose", "open", "animationType", "style", "width", "contentStyle", "presentationStyle"]);
    const animation = useMemo(() => new Animated.Value(0), []);
    const [inAnimation, setInAnimation] = useState(false);
    const { setScrollLocked } = useScrollLock();
    const [currentOpen, setCurrentOpen] = useState(false);
    const backgroundColor = ColorJS("#000").fade(0.5).toString();
    const openDialog = useCallback(() => {
        setCurrentOpen(true);
        setScrollLocked(true);
    }, [setScrollLocked]);
    const closeDialog = useCallback(() => {
        setCurrentOpen(false);
        setScrollLocked(false);
        onClose === null || onClose === void 0 ? void 0 : onClose();
    }, [onClose, setScrollLocked]);
    useEffect(() => {
        if (open)
            openDialog();
        else if (currentOpen)
            closeDialog();
    }, [closeDialog, currentOpen, open, openDialog]);
    const backdropStyle = useMemo(() => [styles.backdrop, { backgroundColor }], [backgroundColor]);
    const cardStyle = useMemo(() => [
        styles.card,
        !!width && { width },
        { transform: [{ scale: animation }] },
        style,
    ], [animation, width, style]);
    useEffect(() => {
        Animated.timing(animation, {
            toValue: currentOpen ? 1 : 0,
            duration: 300,
            useNativeDriver: false,
        }).start(() => setInAnimation(currentOpen));
    }, [animation, currentOpen]);
    const opacityStyle = useMemo(() => [
        {
            opacity: animation.interpolate({
                inputRange: [0, 0.25, 0.75, 1],
                outputRange: [0, 0, 1, 1],
            }),
        },
        styles.dialog,
    ], [animation]);
    if (!currentOpen && !inAnimation)
        return null;
    return (_jsx(Modal, Object.assign({ visible: true, transparent: true, animationType: animationType, onRequestClose: closeDialog, presentationStyle: presentationStyle }, { children: _jsxs(Animated.View, Object.assign({ style: opacityStyle }, { children: [_jsx(Pressable, { style: backdropStyle, onPress: closeDialog }), _jsx(Animated.View, Object.assign({ style: cardStyle }, { children: _jsx(Card, Object.assign({ variant: "outlined" }, props, { children: _jsx(ScrollView, Object.assign({ style: styles.scroll }, { children: _jsx(CardContent, Object.assign({ style: contentStyle }, { children: children })) })) })) }))] })) })));
});
Dialog.displayName = "Dialog";
const styles = StyleSheet.create({
    card: {
        position: "absolute",
        width: 450,
        maxWidth: "90%",
    },
    scroll: {
        maxHeight: "80vh",
    },
    dialog: { alignItems: "center", justifyContent: "center", flex: 1 },
    backdrop: { width: "100%", height: "100%" },
});
