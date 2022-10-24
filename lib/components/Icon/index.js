"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Icon = exports.generateIconCSS = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const theme_1 = require("../../theme");
const AntDesign_1 = __importDefault(require("react-native-vector-icons/dist/AntDesign"));
const Entypo_1 = __importDefault(require("react-native-vector-icons/dist/Entypo"));
const EvilIcons_1 = __importDefault(require("react-native-vector-icons/dist/EvilIcons"));
const Feather_1 = __importDefault(require("react-native-vector-icons/dist/Feather"));
const FontAwesome_1 = __importDefault(require("react-native-vector-icons/dist/FontAwesome"));
const FontAwesome5_1 = __importDefault(require("react-native-vector-icons/dist/FontAwesome5"));
const FontAwesome5Pro_1 = __importDefault(require("react-native-vector-icons/dist/FontAwesome5Pro"));
const Fontisto_1 = __importDefault(require("react-native-vector-icons/dist/Fontisto"));
const Ionicons_1 = __importDefault(require("react-native-vector-icons/dist/Ionicons"));
const Foundation_1 = __importDefault(require("react-native-vector-icons/dist/Foundation"));
const MaterialCommunityIcons_1 = __importDefault(require("react-native-vector-icons/dist/MaterialCommunityIcons"));
const MaterialIcons_1 = __importDefault(require("react-native-vector-icons/dist/MaterialIcons"));
const Octicons_1 = __importDefault(require("react-native-vector-icons/dist/Octicons"));
const SimpleLineIcons_1 = __importDefault(require("react-native-vector-icons/dist/SimpleLineIcons"));
const Zocial_1 = __importDefault(require("react-native-vector-icons/dist/Zocial"));
const IconDist = {
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
const generateIconCSS = (icon) => {
    if (document.getElementById(icon + "-FontFace") !== null)
        return;
    const iconFont = require(`react-native-vector-icons/Fonts/${icon}.ttf`);
    const iconFontStyles = `@font-face { src: url(${iconFont}); font-family: ${icon}; font-display: swap; }`;
    const style = document.createElement("style");
    style.id = icon + "-FontFace";
    style.appendChild(document.createTextNode(iconFontStyles));
    document.head.appendChild(style);
};
exports.generateIconCSS = generateIconCSS;
exports.Icon = (0, react_1.memo)(({ size = 20, type = "MaterialIcons", color = "primary", ...props }) => {
    const theme = (0, theme_1.useTheme)();
    const themeColor = theme.palette[color] || color;
    const IconComponent = IconDist[type];
    (0, react_1.useEffect)(() => (0, exports.generateIconCSS)(type), [type]);
    return (0, jsx_runtime_1.jsx)(IconComponent, { ...props, size: size, color: themeColor });
});
exports.Icon.displayName = "Icon";
