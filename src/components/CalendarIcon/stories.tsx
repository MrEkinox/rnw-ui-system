import dayjs from "dayjs";
import React from "react";
import { View } from "react-native";
import { CalendarIcon } from "./index";

export default {
  component: CalendarIcon,
  title: "CalendarIcon",
};

export const Base = () => (
  <View style={{ padding: 50 }}>
    <CalendarIcon date={dayjs().add(2, "day").toDate()} />
  </View>
);

export const Size = () => (
  <View style={{ padding: 50 }}>
    <CalendarIcon size={100} date={dayjs().add(2, "day").toDate()} />
  </View>
);

export const Circular = () => (
  <View style={{ padding: 50 }}>
    <CalendarIcon variant="circular" date={dayjs().add(2, "day").toDate()} />
  </View>
);

export const Square = () => (
  <View style={{ padding: 50 }}>
    <CalendarIcon variant="square" date={dayjs().add(2, "day").toDate()} />
  </View>
);
