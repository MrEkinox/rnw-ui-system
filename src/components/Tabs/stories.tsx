import { Button } from "../Button";
import React, { useState } from "react";
import { View } from "react-native";
import { Tabs } from "./index";

export default {
  component: Tabs,
  title: "Tabs",
};

export const Base = () => {
  return (
    <View style={{ padding: 50 }}>
      <Tabs
        value={"tab1"}
        items={[
          { label: "Tab1", value: "tab1" },
          { label: "Largeeeeeeeeeeeeeeeee", value: "tab2" },
          { label: "Tab2", value: "tab3" },
        ]}
      />
    </View>
  );
};

export const Disabled = () => (
  <View style={{ padding: 50 }}>
    <Tabs
      disabled
      value={"tab1"}
      items={[
        { label: "Tab1", value: "tab1" },
        { label: "Largeeeeeeeeeeeeeeeee", value: "tab2" },
        { label: "Tab2", value: "tab3" },
      ]}
    />
  </View>
);

export const UpdateTest = () => {
  const [value, setValue] = useState(false);

  const onChange = () => {
    setValue(!value);
  };

  return (
    <View style={{ padding: 50 }}>
      <Tabs
        value={"tab1"}
        items={[
          { label: "Tab1", value: "tab1" },
          { label: "Largeeeeeeeeeeeeeeeee", value: "tab2" },
          { label: "Tab2", value: "tab3" },
        ]}
      />
      <Button onPress={onChange}>Update</Button>
    </View>
  );
};
