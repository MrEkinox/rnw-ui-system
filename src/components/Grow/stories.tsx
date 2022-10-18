import React from "react";
import { View } from "react-native";
import { Grow } from "./index";

export default {
  component: Grow,
  title: "Grow",
};

export const Base = () => (
  <View style={{ padding: 50 }}>
    <Grow />
  </View>
);
