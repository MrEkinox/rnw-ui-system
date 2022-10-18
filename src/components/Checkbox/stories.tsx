import React from "react";
import { View } from "react-native";
import { Checkbox } from "./index";

export default {
  component: Checkbox,
  title: "Checkbox",
};

export const Base = () => (
  <View style={{ padding: 20 }}>
    <Checkbox />
  </View>
);

export const Disabled = () => (
  <View style={{ padding: 20 }}>
    <Checkbox disabled value />
  </View>
);
