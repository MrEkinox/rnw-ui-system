import React from "react";
import { View } from "react-native";
import { Fade } from "./index";

export default {
  component: Fade,
  title: "Fade",
};

export const Base = () => (
  <View style={{ padding: 50 }}>
    <Fade />
  </View>
);
