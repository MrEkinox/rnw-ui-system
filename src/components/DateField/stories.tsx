import React, { useState } from "react";
import { View } from "react-native";
import { DateField } from "./index";
import { Card } from "../Card";
import { CardContent } from "../Card/CardContent";

export default {
  component: DateField,
  title: "DateField",
};

export const Base = () => {
  const [value, setValue] = useState<Date | undefined>(new Date());

  return (
    <View style={{ padding: 50 }}>
      <Card style={{ width: 300 }}>
        <CardContent>
          <DateField
            onChange={setValue}
            label="Bonjour, je suis un label"
            value={value}
          />
        </CardContent>
      </Card>
    </View>
  );
};

export const Large = () => (
  <View style={{ padding: 50 }}>
    <Card style={{ width: "100%" }}>
      <CardContent>
        <DateField label="Bonjour, je suis un label" value={undefined} />
      </CardContent>
    </Card>
  </View>
);
