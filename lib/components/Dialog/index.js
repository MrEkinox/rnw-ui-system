"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Dialog = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const react_native_1 = require("react-native");
const useScrollLock_1 = require("../../hooks/useScrollLock");
const Card_1 = require("../Card");
const color_1 = __importDefault(require("color"));
const CardContent_1 = require("../Card/CardContent");
exports.Dialog = (0, react_1.memo)(({ children, onClose, open = false, animationType, style, width, contentStyle, presentationStyle, ...props }) => {
    const animation = (0, react_1.useMemo)(() => new react_native_1.Animated.Value(0), []);
    const [inAnimation, setInAnimation] = (0, react_1.useState)(false);
    const { setScrollLocked } = (0, useScrollLock_1.useScrollLock)();
    const [currentOpen, setCurrentOpen] = (0, react_1.useState)(false);
    const backgroundColor = (0, color_1.default)("#000").fade(0.5).toString();
    const openDialog = (0, react_1.useCallback)(() => {
        setCurrentOpen(true);
        setScrollLocked(true);
    }, [setScrollLocked]);
    const closeDialog = (0, react_1.useCallback)(() => {
        setCurrentOpen(false);
        setScrollLocked(false);
        onClose?.();
    }, [onClose, setScrollLocked]);
    (0, react_1.useEffect)(() => {
        if (open)
            openDialog();
        else if (currentOpen)
            closeDialog();
    }, [closeDialog, currentOpen, open, openDialog]);
    const backdropStyle = (0, react_1.useMemo)(() => [styles.backdrop, { backgroundColor }], [backgroundColor]);
    const cardStyle = (0, react_1.useMemo)(() => [
        styles.card,
        !!width && { maxWidth: width },
        { transform: [{ scale: animation }] },
        style,
    ], [animation, width, style]);
    (0, react_1.useEffect)(() => {
        react_native_1.Animated.timing(animation, {
            toValue: currentOpen ? 1 : 0,
            duration: 300,
            useNativeDriver: false,
        }).start(() => setInAnimation(currentOpen));
    }, [animation, currentOpen]);
    const opacityStyle = (0, react_1.useMemo)(() => [
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
    return ((0, jsx_runtime_1.jsx)(react_native_1.Modal, { visible: true, transparent: true, animationType: animationType, onRequestClose: closeDialog, presentationStyle: presentationStyle, children: (0, jsx_runtime_1.jsxs)(react_native_1.Animated.View, { style: opacityStyle, children: [(0, jsx_runtime_1.jsx)(react_native_1.Pressable, { style: backdropStyle, onPress: closeDialog }), (0, jsx_runtime_1.jsx)(react_native_1.Animated.View, { style: cardStyle, children: (0, jsx_runtime_1.jsx)(Card_1.Card, { variant: "outlined", ...props, children: (0, jsx_runtime_1.jsx)(react_native_1.ScrollView, { style: styles.scroll, children: (0, jsx_runtime_1.jsx)(CardContent_1.CardContent, { style: contentStyle, children: children }) }) }) })] }) }));
});
exports.Dialog.displayName = "Dialog";
const styles = react_native_1.StyleSheet.create({
    card: {
        position: "absolute",
        width: 450,
        maxWidth: "90%",
    },
    scroll: {
        maxHeight: "90vh",
    },
    dialog: { alignItems: "center", justifyContent: "center", flex: 1 },
    backdrop: { width: "100%", height: "100%" },
});
