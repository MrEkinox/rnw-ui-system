import React, { memo, useEffect } from "react";
import { ViewProps } from "react-native";
import { Colors, useTheme } from "../../theme";
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
import AntDesignGlyph from "react-native-vector-icons/glyphmaps/AntDesign.json";
import EntypoGlyph from "react-native-vector-icons/glyphmaps/Entypo.json";
import EvilIconsGlyph from "react-native-vector-icons/glyphmaps/EvilIcons.json";
import FeatherGlyph from "react-native-vector-icons/glyphmaps/Feather.json";
import FontAwesomeGlyph from "react-native-vector-icons/glyphmaps/FontAwesome.json";
import FontAwesome5Glyph from "react-native-vector-icons/glyphmaps/FontAwesome5Free.json";
import FontAwesome5ProGlyph from "react-native-vector-icons/glyphmaps/FontAwesome5Pro.json";
import FontistoGlyph from "react-native-vector-icons/glyphmaps/Fontisto.json";
import IoniconsGlyph from "react-native-vector-icons/glyphmaps/Ionicons.json";
import FoundationGlyph from "react-native-vector-icons/glyphmaps/Foundation.json";
import MaterialCommunityIconsGlyph from "react-native-vector-icons/glyphmaps/MaterialCommunityIcons.json";
import MaterialIconsGlyph from "react-native-vector-icons/glyphmaps/MaterialIcons.json";
import OcticonsGlyph from "react-native-vector-icons/glyphmaps/Octicons.json";
import SimpleLineIconsGlyph from "react-native-vector-icons/glyphmaps/SimpleLineIcons.json";
import ZocialGlyph from "react-native-vector-icons/glyphmaps/Zocial.json";

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

export type IconType =
  | "AntDesign"
  | "Entypo"
  | "EvilIcons"
  | "Feather"
  | "FontAwesome"
  | "FontAwesome5"
  | "FontAwesome5Pro"
  | "Fontisto"
  | "Foundation"
  | "Ionicons"
  | "MaterialCommunityIcons"
  | "MaterialIcons"
  | "Octicons"
  | "SimpleLineIcons"
  | "Zocial";

export type AntDesignIconProps = {
  name: keyof typeof AntDesignGlyph;
  type: "AntDesign";
};

export type EntypoIconProps = {
  name: keyof typeof EntypoGlyph;
  type: "Entypo";
};

export type EvilIconsIconProps = {
  name: keyof typeof EvilIconsGlyph;
  type: "EvilIcons";
};

export type FeatherIconProps = {
  name: keyof typeof FeatherGlyph;
  type: "Feather";
};

export type FontAwesomeIconProps = {
  name: keyof typeof FontAwesomeGlyph;
  type: "FontAwesome";
};

export type FontAwesome5IconProps = {
  name: keyof typeof FontAwesome5Glyph;
  type: "FontAwesome5";
};

export type FontAwesome5ProIconProps = {
  name: keyof typeof FontAwesome5ProGlyph;
  type: "FontAwesome5Pro";
};

export type FontistoIconProps = {
  name: keyof typeof FontistoGlyph;
  type: "Fontisto";
};

export type FoundationIconProps = {
  name: keyof typeof FoundationGlyph;
  type: "Foundation";
};

export type IoniconsIconProps = {
  name: keyof typeof IoniconsGlyph;
  type: "Ionicons";
};

export type MaterialCommunityIconsIconProps = {
  name: keyof typeof MaterialCommunityIconsGlyph;
  type: "MaterialCommunityIcons";
};

export type MaterialIconsIconProps = {
  name: keyof typeof MaterialIconsGlyph;
  type: "MaterialIcons";
};

export type OcticonsIconProps = {
  name: keyof typeof OcticonsGlyph;
  type: "Octicons";
};

export type SimpleLineIconsIconProps = {
  name: keyof typeof SimpleLineIconsGlyph;
  type: "SimpleLineIcons";
};

export type ZocialIconProps = {
  name: keyof typeof ZocialGlyph;
  type: "Zocial";
};

export type DefaultIconProps = ViewProps & {
  size?: number;
  color?: Colors;
};

export type IconProps = DefaultIconProps &
  (
    | AntDesignIconProps
    | EntypoIconProps
    | EvilIconsIconProps
    | FeatherIconProps
    | FontAwesomeIconProps
    | FontAwesome5IconProps
    | FontAwesome5ProIconProps
    | FontistoIconProps
    | FoundationIconProps
    | IoniconsIconProps
    | MaterialCommunityIconsIconProps
    | MaterialIconsIconProps
    | OcticonsIconProps
    | SimpleLineIconsIconProps
    | ZocialIconProps
  );

export const generateIconCSS = (icon: IconType) => {
  if (document.getElementById(icon + "-FontFace") !== null) return;
  const iconFont = require(`react-native-vector-icons/Fonts/${icon}.ttf`);
  const iconFontStyles = `@font-face { src: url(${iconFont}); font-family: ${icon}; font-display: swap; }`;

  const style = document.createElement("style");
  style.id = icon + "-FontFace";
  style.appendChild(document.createTextNode(iconFontStyles));
  document.head.appendChild(style);
};

export const Icon = memo<IconProps>(
  ({ size = 20, type = "MaterialIcons", color = "primary", ...props }) => {
    const theme = useTheme();

    const themeColor = theme.palette[color] || color;
    const IconComponent = IconDist[type];

    useEffect(() => generateIconCSS(type), [type]);

    return <IconComponent {...props} size={size} color={themeColor} />;
  }
);

Icon.displayName = "Icon";
