import React from "react";
import { View } from "react-native";
import { Chip } from "./index";
import { Icon } from "../Icon";

export default {
  component: Chip,
  title: "Chip",
};

export const Base = () => (
  <View style={{ padding: 50 }}>
    <Chip>Je suis une chip</Chip>
  </View>
);

export const WithIcon = () => (
  <View style={{ padding: 50 }}>
    <Chip startIcon={<Icon type="Ionicons" name="eye" />}>
      Je suis une chip
    </Chip>
  </View>
);

export const Color = () => (
  <View style={{ padding: 50 }}>
    <Chip color="error">Je suis une chip</Chip>
  </View>
);
