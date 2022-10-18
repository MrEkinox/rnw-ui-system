import React from "react";
import { View } from "react-native";
import { Divider } from "./index";

export default {
  component: Divider,
  title: "Divider",
};

export const Base = () => (
  <View style={{ height: 400, padding: 50 }}>
    <Divider />
  </View>
);

export const Middle = () => (
  <View style={{ height: 400, padding: 50 }}>
    <Divider variant="middle" />
  </View>
);

export const Vertical = () => (
  <View style={{ height: 400, padding: 50 }}>
    <Divider orientation="vertical" />
  </View>
);
