"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Dialog = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var react_native_1 = require("react-native");
var useScrollLock_1 = require("../../hooks/useScrollLock");
var Card_1 = require("../Card");
var color_1 = __importDefault(require("color"));
var CardContent_1 = require("../Card/CardContent");
exports.Dialog = (0, react_1.memo)(function (_a) {
    var children = _a.children, onClose = _a.onClose, _b = _a.open, open = _b === void 0 ? false : _b, animationType = _a.animationType, style = _a.style, width = _a.width, contentStyle = _a.contentStyle, presentationStyle = _a.presentationStyle, props = __rest(_a, ["children", "onClose", "open", "animationType", "style", "width", "contentStyle", "presentationStyle"]);
    var animation = (0, react_1.useMemo)(function () { return new react_native_1.Animated.Value(0); }, []);
    var _c = (0, react_1.useState)(false), inAnimation = _c[0], setInAnimation = _c[1];
    var setScrollLocked = (0, useScrollLock_1.useScrollLock)().setScrollLocked;
    var _d = (0, react_1.useState)(false), currentOpen = _d[0], setCurrentOpen = _d[1];
    var backgroundColor = (0, color_1.default)("#000").fade(0.5).toString();
    var openDialog = (0, react_1.useCallback)(function () {
        setCurrentOpen(true);
        setScrollLocked(true);
    }, [setScrollLocked]);
    var closeDialog = (0, react_1.useCallback)(function () {
        setCurrentOpen(false);
        setScrollLocked(false);
        onClose === null || onClose === void 0 ? void 0 : onClose();
    }, [onClose, setScrollLocked]);
    (0, react_1.useEffect)(function () {
        if (open)
            openDialog();
        else if (currentOpen)
            closeDialog();
    }, [closeDialog, currentOpen, open, openDialog]);
    var backdropStyle = (0, react_1.useMemo)(function () { return [styles.backdrop, { backgroundColor: backgroundColor }]; }, [backgroundColor]);
    var cardStyle = (0, react_1.useMemo)(function () { return [
        styles.card,
        !!width && { maxWidth: width },
        { transform: [{ scale: animation }] },
        style,
    ]; }, [animation, width, style]);
    (0, react_1.useEffect)(function () {
        react_native_1.Animated.timing(animation, {
            toValue: currentOpen ? 1 : 0,
            duration: 300,
            useNativeDriver: false,
        }).start(function () { return setInAnimation(currentOpen); });
    }, [animation, currentOpen]);
    var opacityStyle = (0, react_1.useMemo)(function () { return [
        {
            opacity: animation.interpolate({
                inputRange: [0, 0.25, 0.75, 1],
                outputRange: [0, 0, 1, 1],
            }),
        },
        styles.dialog,
    ]; }, [animation]);
    if (!currentOpen && !inAnimation)
        return null;
    return ((0, jsx_runtime_1.jsx)(react_native_1.Modal, __assign({ visible: true, transparent: true, animationType: animationType, onRequestClose: closeDialog, presentationStyle: presentationStyle }, { children: (0, jsx_runtime_1.jsxs)(react_native_1.Animated.View, __assign({ style: opacityStyle }, { children: [(0, jsx_runtime_1.jsx)(react_native_1.Pressable, { style: backdropStyle, onPress: closeDialog }), (0, jsx_runtime_1.jsx)(react_native_1.Animated.View, __assign({ style: cardStyle }, { children: (0, jsx_runtime_1.jsx)(Card_1.Card, __assign({ variant: "outlined" }, props, { children: (0, jsx_runtime_1.jsx)(react_native_1.ScrollView, __assign({ style: styles.scroll }, { children: (0, jsx_runtime_1.jsx)(CardContent_1.CardContent, __assign({ style: contentStyle }, { children: children })) })) })) }))] })) })));
});
exports.Dialog.displayName = "Dialog";
var styles = react_native_1.StyleSheet.create({
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
