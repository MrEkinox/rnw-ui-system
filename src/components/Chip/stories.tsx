import React from "react";
import { View } from "react-native";
import { Chip } from "./index";

export default {
  component: Chip,
  title: "Chip",
};

export const Base = () => (
  <View style={{ padding: 50 }}>
    <Chip />
  </View>
);

export const Color = () => (
  <View style={{ padding: 50 }}>
    <Chip color="error" />
  </View>
);
