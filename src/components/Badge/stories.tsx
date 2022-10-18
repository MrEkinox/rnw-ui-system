import React from "react";
import { View } from "react-native";
import { Badge } from "./index";

export default {
  component: Badge,
  title: "Badge",
};

export const Base = () => (
  <View style={{ padding: 50 }}>
    <Badge />
  </View>
);

export const Color = () => (
  <View style={{ padding: 50 }}>
    <Badge color="error" />
  </View>
);

export const Size = () => (
  <View style={{ padding: 50 }}>
    <Badge size={50} />
  </View>
);

export const Label = () => (
  <View style={{ padding: 50 }}>
    <Badge>12</Badge>
  </View>
);

export const LargeLabel = () => (
  <View style={{ padding: 50 }}>
    <Badge>999+</Badge>
  </View>
);
