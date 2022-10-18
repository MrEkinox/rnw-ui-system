import React from "react";
import { View } from "react-native";
import { Icon } from "./index";

export default {
  component: Icon,
  title: "Icon",
};

export const Base = () => (
  <View style={{ padding: 50 }}>
    <Icon type="FontAwesome" name="rocket" />
  </View>
);
