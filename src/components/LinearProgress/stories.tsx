import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { View } from "react-native";
import { LinearProgress } from "./index";

export default {
  component: LinearProgress,
  title: "LinearProgress",
};

export const Base = () => {
  const [value, setValue] = useState(0);

  useEffect(() => {
    setTimeout(() => {
      if (value >= 100) setValue(0);
      else setValue(value + 10);
    }, 1000);
  }, [value]);

  return (
    <View style={{ padding: 50 }}>
      <LinearProgress value={value} />
    </View>
  );
};

export const Buffer = () => {
  const [value, setValue] = useState(0);
  const [buffer, setBuffer] = useState(10);

  useEffect(() => {
    setTimeout(() => {
      if (value >= 100) {
        setValue(0);
        setBuffer(10);
      } else setValue(value + 10);
    }, 1000);
  }, [value]);

  useEffect(() => {
    setTimeout(() => {
      if (buffer < 100) setBuffer(buffer + 10);
    }, 700);
  }, [buffer]);

  return (
    <View style={{ padding: 50 }}>
      <LinearProgress value={value} valueBuffer={buffer} variant="buffer" />
    </View>
  );
};
