import moment from "moment";
import React from "react";
import { View } from "react-native";
import { CalendarIcon } from "./index";

export default {
  component: CalendarIcon,
  title: "CalendarIcon",
};

export const Base = () => (
  <View style={{ padding: 50 }}>
    <CalendarIcon date={moment().add(2, "day").toDate()} />
  </View>
);

export const Size = () => (
  <View style={{ padding: 50 }}>
    <CalendarIcon size={100} date={moment().add(2, "day").toDate()} />
  </View>
);

export const Circular = () => (
  <View style={{ padding: 50 }}>
    <CalendarIcon variant="circular" date={moment().add(2, "day").toDate()} />
  </View>
);

export const Square = () => (
  <View style={{ padding: 50 }}>
    <CalendarIcon variant="square" date={moment().add(2, "day").toDate()} />
  </View>
);
