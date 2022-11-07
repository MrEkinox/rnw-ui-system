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
import { jsx as _jsx } from "react/jsx-runtime";
import { memo, useEffect } from "react";
import { useTheme } from "../../theme";
import AntDesign from "react-native-vector-icons/dist/AntDesign";
import Entypo from "react-native-vector-icons/dist/Entypo";
import EvilIcons from "react-native-vector-icons/dist/EvilIcons";
import Feather from "react-native-vector-icons/dist/Feather";
import FontAwesome from "react-native-vector-icons/dist/FontAwesome";
import FontAwesome5 from "react-native-vector-icons/dist/FontAwesome5";
import FontAwesome5Pro from "react-native-vector-icons/dist/FontAwesome5Pro";
import Fontisto from "react-native-vector-icons/dist/Fontisto";
import Ionicons from "react-native-vector-icons/dist/Ionicons";
import Foundation from "react-native-vector-icons/dist/Foundation";
import MaterialCommunityIcons from "react-native-vector-icons/dist/MaterialCommunityIcons";
import MaterialIcons from "react-native-vector-icons/dist/MaterialIcons";
import Octicons from "react-native-vector-icons/dist/Octicons";
import SimpleLineIcons from "react-native-vector-icons/dist/SimpleLineIcons";
import Zocial from "react-native-vector-icons/dist/Zocial";
const IconDist = {
    AntDesign,
    Entypo,
    EvilIcons,
    Feather,
    FontAwesome,
    FontAwesome5,
    FontAwesome5Pro,
    Fontisto,
    Foundation,
    Ionicons,
    MaterialCommunityIcons,
    MaterialIcons,
    Octicons,
    SimpleLineIcons,
    Zocial,
};
export const generateIconCSS = (icon) => {
    if (document.getElementById(icon + "-FontFace") !== null)
        return;
    const iconFont = require(`react-native-vector-icons/Fonts/${icon}.ttf`);
    const iconFontStyles = `@font-face { src: url(${iconFont}); font-family: ${icon}; font-display: swap; }`;
    const style = document.createElement("style");
    style.id = icon + "-FontFace";
    style.appendChild(document.createTextNode(iconFontStyles));
    document.head.appendChild(style);
};
export const Icon = memo((_a) => {
    var { size = 20, type = "MaterialIcons", color = "primary" } = _a, props = __rest(_a, ["size", "type", "color"]);
    const theme = useTheme();
    const themeColor = theme.palette[color] || color;
    const IconComponent = IconDist[type];
    useEffect(() => generateIconCSS(type), [type]);
    return _jsx(IconComponent, Object.assign({}, props, { size: size, color: themeColor }));
});
Icon.displayName = "Icon";
