import React, { useState } from "react";
import { View } from "react-native";
import { PhoneField } from "./index";
import { Card } from "../Card";
import { Typography } from "../Typography";
import { CardContent } from "../Card/CardContent";

export default {
  component: PhoneField,
  title: "PhoneField",
};

export const Base = () => {
  const [value, setValue] = useState<string | null>();

  return (
    <View style={{ padding: 50 }}>
      <Card style={{ width: 300 }}>
        <CardContent>
          <PhoneField
            label="Numéro de téléphone"
            value={value}
            onChange={(newValue) => setValue(newValue)}
          />
        </CardContent>
        <Typography gutterBottom variant="body1">
          {value}
        </Typography>
      </Card>
    </View>
  );
};
