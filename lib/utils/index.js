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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isMobile = exports.renderChildren = exports.renderIcon = void 0;
var react_1 = __importDefault(require("react"));
var react_native_web_1 = require("react-native-web");
var renderIcon = function (icon, iconProps) {
    if (react_1.default.isValidElement(icon))
        return react_1.default.cloneElement(icon, __assign(__assign({}, iconProps), icon.props));
    return icon;
};
exports.renderIcon = renderIcon;
var renderChildren = function (children, iconProps) { return react_1.default.Children.map(children, function (child) { return (0, exports.renderIcon)(child, iconProps); }); };
exports.renderChildren = renderChildren;
exports.isMobile = !!(react_native_web_1.DeviceInfo.userAgent.match(/Android/i) ||
    react_native_web_1.DeviceInfo.userAgent.match(/webOS/i) ||
    react_native_web_1.DeviceInfo.userAgent.match(/iPhone/i) ||
    react_native_web_1.DeviceInfo.userAgent.match(/iPad/i) ||
    react_native_web_1.DeviceInfo.userAgent.match(/iPod/i) ||
    react_native_web_1.DeviceInfo.userAgent.match(/BlackBerry/i) ||
    react_native_web_1.DeviceInfo.userAgent.match(/Windows Phone/i));
