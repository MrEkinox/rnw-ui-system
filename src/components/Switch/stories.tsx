import { CardContent } from "../Card/CardContent";
import React from "react";
import { View } from "react-native";
import { Card } from "../Card";
import { Switch } from "./index";

export default {
  component: Switch,
  title: "Switch",
};

export const Base = () => (
  <View style={{ padding: 50 }}>
    <Card>
      <CardContent>
        <Switch value={true} />
      </CardContent>
    </Card>
  </View>
);

export const Disabled = () => (
  <View style={{ padding: 50 }}>
    <Card>
      <CardContent>
        <Switch disabled value={false} />
      </CardContent>
    </Card>
  </View>
);
