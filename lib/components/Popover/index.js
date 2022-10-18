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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Popover = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
var Grow_1 = require("../Grow");
var react_1 = require("react");
var react_native_1 = require("react-native");
var useScrollLock_1 = require("../../hooks/useScrollLock");
var theme_1 = require("../../theme");
var Card_1 = require("../Card");
var Icon_1 = require("../Icon");
exports.Popover = (0, react_1.memo)(function (_a) {
    var parentRef = _a.parentRef, open = _a.open, onClose = _a.onClose, children = _a.children, containerStyle = _a.containerStyle, arrowEnabled = _a.arrowEnabled, animation = _a.animation, arrowPosition = _a.arrowPosition, _b = _a.color, color = _b === void 0 ? "primary" : _b, style = _a.style, props = __rest(_a, ["parentRef", "open", "onClose", "children", "containerStyle", "arrowEnabled", "animation", "arrowPosition", "color", "style"]);
    var _c = (0, react_1.useState)(false), inAnimation = _c[0], setInAnimation = _c[1];
    var theme = (0, theme_1.useTheme)();
    var popoverRef = (0, react_1.useRef)(null);
    var _d = (0, react_native_1.useWindowDimensions)(), windowHeight = _d.height, windowWidth = _d.width;
    var setScrollLocked = (0, useScrollLock_1.useScrollLock)().setScrollLocked;
    var _e = (0, react_1.useState)({
        width: 0,
        height: 0,
    }), parentDimensions = _e[0], setParentDimensions = _e[1];
    var _f = (0, react_1.useState)({
        x: 0,
        y: 0,
        directionY: "bottom",
        directionX: "center",
    }), position = _f[0], setPosition = _f[1];
    var arrowColor = theme.palette[color] || color;
    var borderRadius = theme.borderRadius;
    var openPopover = (0, react_1.useCallback)(function () {
        var _a;
        (_a = parentRef.current) === null || _a === void 0 ? void 0 : _a.measureInWindow(function (px, py, parentWidth, parentHeight) {
            var _a;
            (_a = popoverRef.current) === null || _a === void 0 ? void 0 : _a.measure(function (x2, y2, childWidth, childHeight) {
                console.log("openPopover");
                var directionY = "bottom";
                var y = 0;
                var x = px;
                var directionX = "center";
                if (py + childHeight <= windowHeight) {
                    y = py + parentHeight;
                    directionY = "bottom";
                }
                else if (py - childHeight >= 0) {
                    y = py - childHeight;
                    directionY = "top";
                }
                else {
                    y = windowHeight / 2 - childHeight / 2;
                    directionY = "center";
                }
                if (px + parentWidth / 2 - childWidth / 2 < windowWidth) {
                    x = px + parentWidth / 2 - childWidth / 2;
                    directionX = "center";
                }
                else if (px + childWidth >= windowWidth) {
                    x = px + parentWidth / 2 - childWidth / 2;
                    directionX = "flex-end";
                }
                else if (px - childWidth <= 0) {
                    x = px + childWidth / 2 + parentWidth / 2;
                    console.log({ px: px, childWidth: childWidth, parentWidth: parentWidth });
                    directionX = "flex-start";
                }
                console.log({ directionX: directionX });
                setScrollLocked(true);
                setPosition({ x: x, y: y, directionY: directionY, directionX: directionX });
                setParentDimensions({ width: parentWidth, height: parentHeight });
            });
        });
    }, [parentRef, setScrollLocked, windowHeight, windowWidth]);
    var dynamicArrowPosition = arrowPosition || position.directionX;
    var closePopover = (0, react_1.useCallback)(function () {
        setScrollLocked(false);
        onClose === null || onClose === void 0 ? void 0 : onClose();
    }, [onClose, setScrollLocked]);
    var arrowStyle = (0, react_1.useMemo)(function () { return ({
        marginVertical: -15,
        marginHorizontal: 15,
        alignSelf: dynamicArrowPosition,
    }); }, [dynamicArrowPosition]);
    var arrowComponent = (0, react_1.useMemo)(function () {
        if (arrowEnabled === false)
            return null;
        return ((0, jsx_runtime_1.jsx)(Icon_1.Icon, { type: "Ionicons", name: position.directionY === "bottom" ? "caret-up" : "caret-down", size: 30, color: arrowColor, style: arrowStyle }));
    }, [arrowEnabled, arrowColor, arrowStyle, position.directionY]);
    var popoverStyle = (0, react_1.useMemo)(function () { return [
        {
            opacity: parentDimensions.width ? 1 : 0,
            position: "absolute",
            minHeight: 50,
            top: position.y,
            left: position.x,
        },
        style,
    ]; }, [parentDimensions.width, position.x, position.y, style]);
    var cardStyle = (0, react_1.useMemo)(function () { return [
        styles.card,
        { borderRadius: borderRadius },
        containerStyle,
    ]; }, [borderRadius, containerStyle]);
    var transformOrigin = (0, react_1.useMemo)(function () {
        var positionX = "50%";
        if (dynamicArrowPosition === "flex-start")
            positionX = "10%";
        else if (dynamicArrowPosition === "flex-end")
            positionX = "90%";
        var positionY = position.directionY === "bottom" ? "0%" : "100%";
        return "".concat(positionX, " ").concat(positionY);
    }, [position.directionY, dynamicArrowPosition]);
    if (!open && !inAnimation)
        return null;
    return ((0, jsx_runtime_1.jsxs)(react_native_1.Modal, __assign({ nativeID: "popover", visible: true, onDismiss: closePopover, transparent: true, onShow: openPopover, onRequestClose: closePopover }, { children: [(0, jsx_runtime_1.jsx)(react_native_1.Pressable, { style: styles.backdrop, onPress: closePopover }), (0, jsx_runtime_1.jsx)(react_native_1.View, __assign({ style: popoverStyle, ref: popoverRef }, { children: (0, jsx_runtime_1.jsxs)(Grow_1.Grow, __assign({ visible: open, onAnimationState: setInAnimation, enabled: true, transformOrigin: transformOrigin }, animation, { children: [position.directionY === "bottom" && arrowComponent, (0, jsx_runtime_1.jsx)(Card_1.Card, __assign({ variant: "outlined", elevation: 10, color: color, style: cardStyle }, props, { children: children })), position.directionY === "top" && arrowComponent] })) }))] })));
});
exports.Popover.displayName = "Popover";
var styles = react_native_1.StyleSheet.create({
    card: {
        minHeight: 50,
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
