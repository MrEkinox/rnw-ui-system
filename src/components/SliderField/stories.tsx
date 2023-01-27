import React, { useState } from "react";
import { View } from "react-native";
import { SliderField } from "./index";
import { Card } from "../Card";
import { CardContent } from "../Card/CardContent";

export default {
  component: SliderField,
  title: "SliderField",
};

export const Base = () => {
  const [value, setValue] = useState(0);
  return (
    <View style={{ padding: 50 }}>
      <Card style={{ width: 300 }}>
        <CardContent>
          <SliderField
            onChange={setValue}
            maxValue={30}
            minValue={0}
            value={value}
            step={1}
            label="Bonjour, je suis un label"
          />
        </CardContent>
      </Card>
    </View>
  );
};
