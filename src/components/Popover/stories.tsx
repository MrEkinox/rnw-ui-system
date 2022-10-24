import React, { useRef, useState } from "react";
import { ScrollView, View } from "react-native";
import { Popover } from "./index";
import { Button } from "../Button";
import { Typography } from "../Typography";
import { Slider as SliderComponent } from "../Slider";
import { CardContent } from "../Card/CardContent";

export default {
  component: Popover,
  title: "Popover",
};

export const Base = () => {
  const [open, setOpen] = useState(false);
  const ref = useRef<View>(null);

  return (
    <View style={{ padding: 20, height: "400vh" }}>
      <View style={{ height: "90vh" }} />
      <View ref={ref}>
        <Button onPress={() => setOpen(true)} fullWidth>
          Open Popover
        </Button>
      </View>
      <Popover open={open} parentRef={ref} onClose={() => setOpen(false)}>
        <Typography variant="h6">Je suis une popover</Typography>
      </Popover>
    </View>
  );
};

export const WithoutParent = () => {
  const [open, setOpen] = useState(false);

  return (
    <View style={{ padding: 20, height: "400vh" }}>
      <View style={{ height: "90vh" }} />
      <View>
        <Button onPress={() => setOpen(true)} fullWidth>
          Open Popover
        </Button>
        <Popover open={open} onClose={() => setOpen(false)}>
          <Typography variant="h6">Je suis une popover</Typography>
        </Popover>
      </View>
    </View>
  );
};

export const Slider = () => {
  const [open, setOpen] = useState(false);
  const ref = useRef<View>(null);

  return (
    <View style={{ padding: 20, height: "400vh" }}>
      <View ref={ref}>
        <Button onPress={() => setOpen(true)} fullWidth>
          Open Popover
        </Button>
      </View>
      <Popover open={open} parentRef={ref} onClose={() => setOpen(false)}>
        <CardContent style={{ width: 200 }}>
          <SliderComponent
            maxValue={100}
            minValue={0}
            value={50}
            onChange={() => {}}
          />
        </CardContent>
      </Popover>
    </View>
  );
};
