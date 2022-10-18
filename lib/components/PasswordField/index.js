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
Object.defineProperty(exports, "__esModule", { value: true });
exports.PasswordField = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
var TextField_1 = require("../TextField");
var react_1 = require("react");
var Button_1 = require("../Button");
var Icon_1 = require("../Icon");
exports.PasswordField = (0, react_1.memo)(function (props) {
    var _a = (0, react_1.useState)(false), isVisible = _a[0], setIsVisible = _a[1];
    var onToggleVisibility = (0, react_1.useCallback)(function () { return setIsVisible(function (visible) { return !visible; }); }, []);
    var endIcon = (0, react_1.useMemo)(function () { return ((0, jsx_runtime_1.jsx)(Button_1.Button, __assign({ onPress: onToggleVisibility, size: "small" }, { children: (0, jsx_runtime_1.jsx)(Icon_1.Icon, { type: "Ionicons", name: isVisible ? "eye" : "eye-off" }) }))); }, [isVisible, onToggleVisibility]);
    return ((0, jsx_runtime_1.jsx)(TextField_1.TextField, __assign({ textContentType: "password", endIcon: endIcon }, props, { secureTextEntry: !isVisible })));
});
