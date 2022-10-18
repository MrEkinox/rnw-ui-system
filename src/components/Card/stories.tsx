import React from "react";
import { View } from "react-native";
import { Typography } from "../Typography";
import { CardContent } from "./CardContent";
import { Card } from "./index";

export default {
  component: Card,
  title: "Card",
};

export const Base = () => (
  <View style={{ padding: 50 }}>
    <Card>
      <CardContent>
        <Typography variant="overline" color="textSecondary" gutterBottom>
          Word of the Day
        </Typography>
        <Typography variant="h5">be nev o lent</Typography>
        <Typography color="textSecondary">adjective</Typography>
        <Typography variant="body2">
          well meaning and kindly.
          <br />
          {'"a benevolent smile"'}
        </Typography>
      </CardContent>
    </Card>
  </View>
);

export const Square = () => (
  <View style={{ padding: 50 }}>
    <Card square>
      <CardContent>
        <Typography variant="overline" color="textSecondary" gutterBottom>
          Word of the Day
        </Typography>
        <Typography variant="h5">be nev o lent</Typography>
        <Typography color="textSecondary">adjective</Typography>
        <Typography variant="body2">
          well meaning and kindly.
          <br />
          {'"a benevolent smile"'}
        </Typography>
      </CardContent>
    </Card>
  </View>
);

export const Elevation = () => (
  <View style={{ padding: 50 }}>
    <Card variant="elevation" elevation={5}>
      <CardContent>
        <Typography variant="overline" color="textSecondary" gutterBottom>
          Word of the Day
        </Typography>
        <Typography variant="h5">be nev o lent</Typography>
        <Typography color="textSecondary">adjective</Typography>
        <Typography variant="body2">
          well meaning and kindly.
          <br />
          {'"a benevolent smile"'}
        </Typography>
      </CardContent>
    </Card>
  </View>
);
