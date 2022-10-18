import React from "react";
import { View } from "react-native";
import { SliderField } from "./index";
import { Card } from "../Card";
import { CardContent } from "../Card/CardContent";

export default {
  component: SliderField,
  title: "SliderField",
};

export const Base = () => (
  <View style={{ padding: 50 }}>
    <Card style={{ width: 300 }}>
      <CardContent>
        <SliderField
          onChange={() => {}}
          maxValue={30}
          minValue={0}
          value={0}
          step={1}
          label="Bonjour, je suis un label"
        />
      </CardContent>
    </Card>
  </View>
);
