import React, { useState } from "react";
import { View } from "react-native";
import { Typography } from "../Typography";
import { Rating } from "./index";

export default {
  component: Rating,
  title: "Rating",
};

export const Base = () => (
  <View style={{ padding: 50 }}>
    <Rating value={0} />
  </View>
);

export const Color = () => (
  <View style={{ padding: 50 }}>
    <Rating value={4} color="#FFE600" />
  </View>
);

export const Touchable = () => {
  const [value, setValue] = useState(0);
  return (
    <View style={{ padding: 50, alignItems: "center" }}>
      <Rating value={value} onChange={setValue} touchable />
      <Typography variant="h6">{`Note : ${value}/5`}</Typography>
    </View>
  );
};
