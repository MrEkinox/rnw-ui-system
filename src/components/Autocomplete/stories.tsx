import React, { useState } from "react";
import { View } from "react-native";
import { Autocomplete } from "./index";
import { Card } from "../Card";
import { CardContent } from "../Card/CardContent";
import { Typography } from "../Typography";

export default {
  component: Autocomplete,
  title: "Autocomplete",
};

export const Base = () => {
  const [value, setValue] = useState("");

  return (
    <View style={{ padding: 50 }}>
      <View style={{ height: 200 }} />
      <Card style={{ width: 300 }}>
        <CardContent>
          <Autocomplete
            label="Bonjour, je suis un label"
            value={value}
            onChange={setValue}
            items={[
              { label: "Option 1", value: "option1" },
              { label: "Option 2", value: "option2" },
              { label: "Option 3", value: "option3" },
              { label: "Option 4", value: "option4" },
              { label: "Option 5", value: "option5" },
              { label: "Option 6", value: "option6" },
              { label: "Option 7", value: "option7" },
              { label: "Option 8", value: "option8" },
            ]}
          />
          <Typography>Value: {value}</Typography>
        </CardContent>
      </Card>
      <View style={{ height: 200 }} />
    </View>
  );
};

export const Solo = () => {
  const [value, setValue] = useState("");
  return (
    <View style={{ padding: 50 }}>
      <View style={{ height: 200 }} />
      <Card style={{ width: 300 }}>
        <CardContent>
          <Autocomplete
            label="Bonjour, je suis un label"
            value={value}
            onChange={setValue}
            solo
            items={[
              { label: "ÉOption 1", value: "option1" },
              { label: "Option 2", value: "option2" },
              { label: "Option 3", value: "option3" },
              { label: "Option 4", value: "option4" },
              { label: "Option 5", value: "option5" },
              { label: "Option 6", value: "option6" },
              { label: "Option 7", value: "option7" },
              { label: "Option 8", value: "option8" },
            ]}
          />
          <Typography>Value: {value}</Typography>
        </CardContent>
      </Card>
    </View>
  );
};
