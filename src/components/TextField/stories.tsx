import React, { useState } from "react";
import { View } from "react-native";
import { Icon } from "../Icon";
import { TextField } from "./index";
import { Button } from "../Button";
import { Card } from "../Card";
import { CardContent } from "../Card/CardContent";

export default {
  component: TextField,
  title: "TextField",
};

export const UpdateTest = () => {
  const [value, setValue] = useState(false);

  const onChange = () => {
    setValue(!value);
  };

  return (
    <View style={{ padding: 50 }}>
      <TextField label="Bonjour, je suis un label" value="dzdjzid" />
      <Button onPress={onChange}>Update</Button>
    </View>
  );
};

export const Base = () => (
  <View style={{ padding: 50 }}>
    <Card>
      <CardContent>
        <TextField label="Bonjour, je suis un label" value="dzdjzid" />
      </CardContent>
    </Card>
  </View>
);

export const DisplayMaxCount = () => (
  <View style={{ padding: 50 }}>
    <Card>
      <CardContent>
        <TextField
          label="Bonjour, je suis un label"
          value="dzdjzid"
          displayMaxCount
          maxLength={30}
        />
      </CardContent>
    </Card>
  </View>
);

export const HelperText = () => {
  const [value, setValue] = useState("");

  return (
    <View style={{ padding: 50 }}>
      <Card>
        <CardContent>
          <TextField
            required
            helperText={!value && "Champ requis"}
            error={!value}
            value={value}
            onChange={setValue}
            label="Bonjour, je suis un label"
          />
        </CardContent>
      </Card>
    </View>
  );
};

export const Multiline = () => (
  <View style={{ padding: 50 }}>
    <Card>
      <CardContent>
        <TextField
          multiline
          style={{ height: 200 }}
          label="Bonjour, je suis un label"
          value="dzdjzid"
        />
      </CardContent>
    </Card>
  </View>
);

export const WithIcon = () => (
  <View style={{ padding: 50 }}>
    <Card>
      <CardContent>
        <TextField
          startIcon={<Icon type="FontAwesome" name="rocket" />}
          endIcon={<Icon type="FontAwesome" name="rocket" />}
          label="Bonjour, je suis un label"
          value="dzdjzid"
        />
      </CardContent>
    </Card>
  </View>
);

export const Custom = () => (
  <View style={{ padding: 50 }}>
    <Card>
      <CardContent>
        <TextField
          endIcon={
            <Button size="large" style={{ margin: 10 }}>
              Push me :3
            </Button>
          }
          label="Bonjour, je suis un label"
          value="dzdjzid"
        />
      </CardContent>
    </Card>
  </View>
);

export const Placeholder = () => (
  <View style={{ padding: 50 }}>
    <Card>
      <CardContent>
        <TextField placeholder="Bonjour, je suis un label" />
      </CardContent>
    </Card>
  </View>
);

export const Disabled = () => (
  <View style={{ padding: 50 }}>
    <Card>
      <CardContent>
        <TextField disabled label="Bonjour, je suis un label" value="dzdjzid" />
      </CardContent>
    </Card>
  </View>
);
