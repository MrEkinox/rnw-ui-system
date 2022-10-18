import { CardContent } from "../Card/CardContent";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { View } from "react-native";
import { Card } from "../Card";
import { Typography } from "../Typography";
import { CircularProgress } from "./index";

export default {
  component: CircularProgress,
  title: "CircularProgress",
};

export const Base = () => {
  const [value, setValue] = useState(0);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (value < 100) setValue(value + 1);
      else setValue(0);
    }, 200);
    return () => clearTimeout(timeout);
  }, [value]);

  return (
    <View style={{ padding: 20, width: 400 }}>
      <Card>
        <CardContent>
          <CircularProgress value={value}>
            <Typography color="primary" variant="h6">
              {value}%
            </Typography>
          </CircularProgress>
        </CardContent>
      </Card>
    </View>
  );
};

export const LineCap = () => (
  <View style={{ padding: 20, width: 400 }}>
    <Card>
      <CardContent>
        <CircularProgress lineCap="square" value={50} />
      </CardContent>
    </Card>
  </View>
);

export const MaxValue = () => (
  <View style={{ padding: 20, width: 400 }}>
    <Card>
      <CardContent>
        <CircularProgress lineCap="square" value={100} maxValue={1000} />
      </CardContent>
    </Card>
  </View>
);
