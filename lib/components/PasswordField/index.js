"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PasswordField = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const TextField_1 = require("../TextField");
const react_1 = require("react");
const Button_1 = require("../Button");
const Icon_1 = require("../Icon");
exports.PasswordField = (0, react_1.memo)((props) => {
    const [isVisible, setIsVisible] = (0, react_1.useState)(false);
    const onToggleVisibility = (0, react_1.useCallback)(() => setIsVisible((visible) => !visible), []);
    const endIcon = (0, react_1.useMemo)(() => ((0, jsx_runtime_1.jsx)(Button_1.Button, { onPress: onToggleVisibility, size: "small", children: (0, jsx_runtime_1.jsx)(Icon_1.Icon, { type: "Ionicons", name: isVisible ? "eye" : "eye-off" }) })), [isVisible, onToggleVisibility]);
    return ((0, jsx_runtime_1.jsx)(TextField_1.TextField, { textContentType: "password", endIcon: endIcon, ...props, secureTextEntry: !isVisible }));
});
