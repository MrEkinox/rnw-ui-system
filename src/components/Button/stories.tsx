import React from "react";
import { useState } from "react";
import { View } from "react-native";
import { Icon } from "../Icon";
import { Button } from "./index";

export default {
  component: Button,
  title: "Button",
};

export const Base = () => {
  const [loading, setLoading] = useState(false);

  const startLoading = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  };

  return (
    <View style={{ padding: 50 }}>
      <Button
        loading={loading}
        loadingPosition="start"
        startIcon={<Icon type="FontAwesome" name="rocket" />}
        onPress={startLoading}
      >
        Button
      </Button>
    </View>
  );
};

export const FullWidth = () => (
  <View style={{ padding: 50 }}>
    <Button fullWidth>Button</Button>
  </View>
);

export const Variants = () => (
  <View style={{ padding: 50 }}>
    <Button style={{ marginBottom: 10 }} variant="contained">
      Button
    </Button>
    <Button style={{ marginBottom: 10 }} variant="outlined">
      Button
    </Button>
    <Button style={{ marginBottom: 10 }} variant="hovered">
      Button
    </Button>
    <Button style={{ marginBottom: 10 }} variant="text">
      Button
    </Button>
  </View>
);

export const Size = () => (
  <View style={{ padding: 50 }}>
    <Button style={{ marginBottom: 10 }} variant="contained" size="small">
      Button
    </Button>
    <Button style={{ marginBottom: 10 }} variant="contained" size="medium">
      Button
    </Button>
    <Button style={{ marginBottom: 10 }} variant="contained" size="large">
      Button
    </Button>
  </View>
);

export const Icons = () => (
  <View style={{ padding: 50 }}>
    <Button
      style={{ marginBottom: 10 }}
      startIcon={<Icon type="FontAwesome" name="rocket" />}
      endIcon={<Icon type="FontAwesome" name="rocket" />}
      variant="contained"
      size="small"
    >
      Submit
    </Button>
    <Button
      style={{ marginBottom: 10 }}
      startIcon={<Icon type="FontAwesome" name="rocket" />}
      endIcon={<Icon type="FontAwesome" name="rocket" />}
      variant="outlined"
      size="medium"
    >
      Submit
    </Button>
    <Button
      style={{ marginBottom: 10 }}
      startIcon={<Icon type="FontAwesome" name="rocket" />}
      endIcon={<Icon type="FontAwesome" name="rocket" />}
      variant="hovered"
      size="medium"
    >
      Submit
    </Button>
    <Button
      style={{ marginBottom: 10 }}
      startIcon={<Icon type="FontAwesome" name="rocket" />}
      endIcon={<Icon type="FontAwesome" name="rocket" />}
      variant="text"
      size="large"
    >
      Submit
    </Button>
    <Button style={{ marginBottom: 10 }} variant="contained">
      <Icon type="FontAwesome" name="rocket" />
    </Button>
  </View>
);

export const Disabled = () => (
  <View style={{ padding: 50 }}>
    <Button style={{ marginBottom: 10 }} disabled variant="contained">
      Submit
    </Button>
    <Button style={{ marginBottom: 10 }} disabled variant="outlined">
      Submit
    </Button>
    <Button style={{ marginBottom: 10 }} disabled variant="hovered">
      Submit
    </Button>
    <Button style={{ marginBottom: 10 }} disabled variant="text">
      Submit
    </Button>
  </View>
);

export const Loading = () => (
  <View style={{ padding: 50 }}>
    <Button style={{ marginBottom: 10 }} loading variant="outlined">
      Submit
    </Button>
    <Button
      style={{ marginBottom: 10 }}
      loading
      loadingIndicator="Loading..."
      variant="outlined"
    >
      Fetch data
    </Button>
    <Button
      style={{ marginBottom: 10 }}
      loading
      loadingPosition="start"
      variant="outlined"
    >
      Save
    </Button>
    <Button
      style={{ marginBottom: 10 }}
      loading
      loadingPosition="end"
      variant="outlined"
    >
      Save
    </Button>
  </View>
);
