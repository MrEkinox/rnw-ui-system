import React, { useState } from "react";
import { View } from "react-native";
import { SelectField } from "./index";
import { Card } from "../Card";
import { CardContent } from "../Card/CardContent";

export default {
  component: SelectField,
  title: "SelectField",
};

export const Base = () => (
  <View style={{ padding: 50 }}>
    <View style={{ height: 200 }} />
    <Card style={{ width: 300 }}>
      <CardContent>
        <SelectField
          label="Bonjour, je suis un label"
          value={undefined}
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
      </CardContent>
    </Card>
    <View style={{ height: 200 }} />
  </View>
);

export const HelperText = () => {
  const [value, setValue] = useState<any>("");

  return (
    <View style={{ padding: 50 }}>
      <View style={{ height: 200 }} />
      <Card style={{ width: 300 }}>
        <CardContent>
          <SelectField
            required
            helperText={!value && "Champ requis"}
            error={!value}
            label="Bonjour, je suis un label"
            value={value}
            onChange={setValue}
            items={[
              { label: "Option 1", value: "option1" },
              { label: "Option 2", value: "option2" },
              { label: "Option 3", value: "option3" },
              { label: "Option 4", value: "option4" },
            ]}
          />
        </CardContent>
      </Card>
      <View style={{ height: 200 }} />
    </View>
  );
};

export const Multiple = () => {
  const [state, setState] = useState([]);

  return (
    <View style={{ padding: 50 }}>
      <View style={{ height: 200 }} />
      <Card style={{ width: 300 }}>
        <CardContent>
          <SelectField
            label="Bonjour, je suis un label"
            value={state}
            onChange={setState}
            multiple
            items={[
              { label: "Option 1", value: "option1" },
              { label: "Option 2", value: "option2" },
              { label: "Option 3", value: "option3" },
              { label: "Option 4", value: "option4" },
            ]}
          />
        </CardContent>
      </Card>
      <View style={{ height: 200 }} />
    </View>
  );
};

export const Disabled = () => (
  <View style={{ padding: 50 }}>
    <View style={{ height: 200 }} />
    <Card style={{ width: 300 }}>
      <CardContent>
        <SelectField
          label="Bonjour, je suis un label"
          value={[]}
          multiple
          disabled
          items={[
            { label: "Option 1", value: "option1" },
            { label: "Option 2", value: "option2" },
            { label: "Option 3", value: "option3" },
            { label: "Option 4", value: "option4" },
          ]}
        />
      </CardContent>
    </Card>
    <View style={{ height: 200 }} />
  </View>
);
