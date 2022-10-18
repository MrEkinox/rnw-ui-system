import React from "react";
import { ViewProps } from "react-native";
import { Colors } from "../../theme";
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
export declare type IconType = "AntDesign" | "Entypo" | "EvilIcons" | "Feather" | "FontAwesome" | "FontAwesome5" | "FontAwesome5Pro" | "Fontisto" | "Foundation" | "Ionicons" | "MaterialCommunityIcons" | "MaterialIcons" | "Octicons" | "SimpleLineIcons" | "Zocial";
export declare type AntDesignIconProps = {
    name: keyof typeof AntDesignGlyph;
    type: "AntDesign";
};
export declare type EntypoIconProps = {
    name: keyof typeof EntypoGlyph;
    type: "Entypo";
};
export declare type EvilIconsIconProps = {
    name: keyof typeof EvilIconsGlyph;
    type: "EvilIcons";
};
export declare type FeatherIconProps = {
    name: keyof typeof FeatherGlyph;
    type: "Feather";
};
export declare type FontAwesomeIconProps = {
    name: keyof typeof FontAwesomeGlyph;
    type: "FontAwesome";
};
export declare type FontAwesome5IconProps = {
    name: keyof typeof FontAwesome5Glyph;
    type: "FontAwesome5";
};
export declare type FontAwesome5ProIconProps = {
    name: keyof typeof FontAwesome5ProGlyph;
    type: "FontAwesome5Pro";
};
export declare type FontistoIconProps = {
    name: keyof typeof FontistoGlyph;
    type: "Fontisto";
};
export declare type FoundationIconProps = {
    name: keyof typeof FoundationGlyph;
    type: "Foundation";
};
export declare type IoniconsIconProps = {
    name: keyof typeof IoniconsGlyph;
    type: "Ionicons";
};
export declare type MaterialCommunityIconsIconProps = {
    name: keyof typeof MaterialCommunityIconsGlyph;
    type: "MaterialCommunityIcons";
};
export declare type MaterialIconsIconProps = {
    name: keyof typeof MaterialIconsGlyph;
    type: "MaterialIcons";
};
export declare type OcticonsIconProps = {
    name: keyof typeof OcticonsGlyph;
    type: "Octicons";
};
export declare type SimpleLineIconsIconProps = {
    name: keyof typeof SimpleLineIconsGlyph;
    type: "SimpleLineIcons";
};
export declare type ZocialIconProps = {
    name: keyof typeof ZocialGlyph;
    type: "Zocial";
};
export declare type DefaultIconProps = ViewProps & {
    size?: number;
    color?: Colors;
};
export declare type IconProps = DefaultIconProps & (AntDesignIconProps | EntypoIconProps | EvilIconsIconProps | FeatherIconProps | FontAwesomeIconProps | FontAwesome5IconProps | FontAwesome5ProIconProps | FontistoIconProps | FoundationIconProps | IoniconsIconProps | MaterialCommunityIconsIconProps | MaterialIconsIconProps | OcticonsIconProps | SimpleLineIconsIconProps | ZocialIconProps);
export declare const generateIconCSS: (icon: IconType) => void;
export declare const Icon: React.NamedExoticComponent<IconProps>;
