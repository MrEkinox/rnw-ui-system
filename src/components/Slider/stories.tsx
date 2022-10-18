import { CardContent } from "../Card/CardContent";
import React, { useState } from "react";
import { Text, View } from "react-native";
import { Card } from "../Card";
import { Typography } from "../Typography";
import { Slider } from "./index";

export default {
  component: Slider,
  title: "Slider",
};

export const Base = () => {
  const [value, setValue] = useState(15);

  return (
    <View style={{ padding: 20 }}>
      <Card>
        <CardContent style={{ padding: 40 }}>
          <Slider
            maxValue={30}
            minValue={0}
            value={value}
            step={0.001}
            onChange={(newValue) => {
              setValue(newValue);
            }}
          />
          <Typography variant="body1" style={{ marginTop: 20 }}>
            {value}
          </Typography>
        </CardContent>
      </Card>
    </View>
  );
};

export const Label = () => (
  <View style={{ padding: 20 }}>
    <Card>
      <CardContent style={{ padding: 40 }}>
        <Slider
          maxValue={30}
          // eslint-disable-next-line react/no-unstable-nested-components
          getLabel={(value) => (
            <View
              style={{
                backgroundColor: "#bbb9c7",
                aspectRatio: 1,
                padding: 5,
                justifyContent: "center",
                borderRadius: 999,
              }}
            >
              <Text selectable={false}>{value}</Text>
            </View>
          )}
          minValue={0}
          value={15}
          onChange={() => {}}
        />
      </CardContent>
    </Card>
  </View>
);

export const Multiple = () => (
  <View style={{ padding: 20 }}>
    <Card>
      <CardContent style={{ padding: 40 }}>
        <Slider
          maxValue={30}
          minValue={0}
          step={3}
          marks
          getLabel={(value) => value}
          value={[0, 15, 30]}
          onChange={() => {}}
        />
      </CardContent>
    </Card>
  </View>
);

export const Color = () => (
  <View style={{ padding: 20 }}>
    <Card>
      <CardContent style={{ padding: 40 }}>
        <Slider
          maxValue={30}
          minValue={0}
          step={3}
          marks
          color="secondary"
          getLabel={(value) => value}
          value={[0, 15, 30]}
          onChange={() => {}}
        />
      </CardContent>
    </Card>
  </View>
);
export const Test = () => (
  <View style={{ padding: 20 }}>
    <Card>
      <CardContent style={{ padding: 40 }}>
        <Slider
          maxValue={30}
          minValue={0}
          step={3}
          marks
          color="secondary"
          getLabel={(value) => value}
          value={[0, 10, 15, 20, 30]}
          onChange={() => {}}
        />
      </CardContent>
    </Card>
  </View>
);

export const Disabled = () => (
  <View style={{ padding: 20 }}>
    <Card>
      <CardContent style={{ padding: 40 }}>
        <Slider
          disabled
          maxValue={30}
          minValue={0}
          value={15}
          step={3}
          marks
          onChange={() => {}}
        />
      </CardContent>
    </Card>
  </View>
);

export const Step = () => (
  <View style={{ padding: 20 }}>
    <Card>
      <CardContent style={{ padding: 40 }}>
        <Slider
          step={10}
          maxValue={30}
          minValue={0}
          value={15}
          onChange={() => {}}
        />
      </CardContent>
    </Card>
  </View>
);

export const Marks = () => (
  <View style={{ padding: 20 }}>
    <Card>
      <CardContent style={{ padding: 40 }}>
        <Slider
          marks
          step={10}
          maxValue={30}
          minValue={0}
          value={15}
          onChange={() => {}}
        />
      </CardContent>
    </Card>
  </View>
);
