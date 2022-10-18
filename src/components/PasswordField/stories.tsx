import { Card } from "../Card";
import React from "react";
import { View } from "react-native";
import { PasswordField } from "./index";
import { CardContent } from "../Card/CardContent";

export default {
  component: PasswordField,
  title: "PasswordField",
};

export const Base = () => (
  <View style={{ padding: 50 }}>
    <Card style={{ width: 300 }}>
      <CardContent>
        <PasswordField />
      </CardContent>
    </Card>
  </View>
);
