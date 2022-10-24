"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isMobile = exports.renderChildren = exports.renderIcon = void 0;
const react_1 = __importDefault(require("react"));
const react_native_web_1 = require("react-native-web");
const renderIcon = (icon, iconProps) => {
    if (react_1.default.isValidElement(icon))
        return react_1.default.cloneElement(icon, { ...iconProps, ...icon.props });
    return icon;
};
exports.renderIcon = renderIcon;
const renderChildren = (children, iconProps) => react_1.default.Children.map(children, (child) => (0, exports.renderIcon)(child, iconProps));
exports.renderChildren = renderChildren;
exports.isMobile = !!(react_native_web_1.DeviceInfo.userAgent.match(/Android/i) ||
    react_native_web_1.DeviceInfo.userAgent.match(/webOS/i) ||
    react_native_web_1.DeviceInfo.userAgent.match(/iPhone/i) ||
    react_native_web_1.DeviceInfo.userAgent.match(/iPad/i) ||
    react_native_web_1.DeviceInfo.userAgent.match(/iPod/i) ||
    react_native_web_1.DeviceInfo.userAgent.match(/BlackBerry/i) ||
    react_native_web_1.DeviceInfo.userAgent.match(/Windows Phone/i));
