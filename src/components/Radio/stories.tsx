import React from "react";
import { View } from "react-native";
import { Radio } from "./index";

export default {
  component: Radio,
  title: "Radio",
};

export const Base = () => (
  <View style={{ padding: 20 }}>
    <Radio />
  </View>
);

export const Disabled = () => (
  <View style={{ padding: 20 }}>
    <Radio disabled value />
  </View>
);
