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
exports.Icon = exports.generateIconCSS = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var theme_1 = require("../../theme");
var AntDesign_1 = __importDefault(require("react-native-vector-icons/dist/AntDesign"));
var Entypo_1 = __importDefault(require("react-native-vector-icons/dist/Entypo"));
var EvilIcons_1 = __importDefault(require("react-native-vector-icons/dist/EvilIcons"));
var Feather_1 = __importDefault(require("react-native-vector-icons/dist/Feather"));
var FontAwesome_1 = __importDefault(require("react-native-vector-icons/dist/FontAwesome"));
var FontAwesome5_1 = __importDefault(require("react-native-vector-icons/dist/FontAwesome5"));
var FontAwesome5Pro_1 = __importDefault(require("react-native-vector-icons/dist/FontAwesome5Pro"));
var Fontisto_1 = __importDefault(require("react-native-vector-icons/dist/Fontisto"));
var Ionicons_1 = __importDefault(require("react-native-vector-icons/dist/Ionicons"));
var Foundation_1 = __importDefault(require("react-native-vector-icons/dist/Foundation"));
var MaterialCommunityIcons_1 = __importDefault(require("react-native-vector-icons/dist/MaterialCommunityIcons"));
var MaterialIcons_1 = __importDefault(require("react-native-vector-icons/dist/MaterialIcons"));
var Octicons_1 = __importDefault(require("react-native-vector-icons/dist/Octicons"));
var SimpleLineIcons_1 = __importDefault(require("react-native-vector-icons/dist/SimpleLineIcons"));
var Zocial_1 = __importDefault(require("react-native-vector-icons/dist/Zocial"));
var IconDist = {
    AntDesign: AntDesign_1.default,
    Entypo: Entypo_1.default,
    EvilIcons: EvilIcons_1.default,
    Feather: Feather_1.default,
    FontAwesome: FontAwesome_1.default,
    FontAwesome5: FontAwesome5_1.default,
    FontAwesome5Pro: FontAwesome5Pro_1.default,
    Fontisto: Fontisto_1.default,
    Foundation: Foundation_1.default,
    Ionicons: Ionicons_1.default,
    MaterialCommunityIcons: MaterialCommunityIcons_1.default,
    MaterialIcons: MaterialIcons_1.default,
    Octicons: Octicons_1.default,
    SimpleLineIcons: SimpleLineIcons_1.default,
    Zocial: Zocial_1.default,
};
var generateIconCSS = function (icon) {
    if (document.getElementById(icon + "-FontFace") !== null)
        return;
    var iconFont = require("react-native-vector-icons/Fonts/".concat(icon, ".ttf"));
    var iconFontStyles = "@font-face { src: url(".concat(iconFont, "); font-family: ").concat(icon, "; font-display: swap; }");
    var style = document.createElement("style");
    style.id = icon + "-FontFace";
    style.appendChild(document.createTextNode(iconFontStyles));
    document.head.appendChild(style);
};
exports.generateIconCSS = generateIconCSS;
exports.Icon = (0, react_1.memo)(function (_a) {
    var _b = _a.size, size = _b === void 0 ? 20 : _b, _c = _a.type, type = _c === void 0 ? "MaterialIcons" : _c, _d = _a.color, color = _d === void 0 ? "primary" : _d, props = __rest(_a, ["size", "type", "color"]);
    var theme = (0, theme_1.useTheme)();
    var themeColor = theme.palette[color] || color;
    var IconComponent = IconDist[type];
    (0, react_1.useEffect)(function () { return (0, exports.generateIconCSS)(type); }, [type]);
    return (0, jsx_runtime_1.jsx)(IconComponent, __assign({}, props, { size: size, color: themeColor }));
});
exports.Icon.displayName = "Icon";
