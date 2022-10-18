import React from "react";
import { View } from "react-native";
import { Icon } from "../Icon";
import { IconButton } from "./index";

export default {
  component: IconButton,
  title: "IconButton",
};

export const Base = () => (
  <View style={{ padding: 50 }}>
    <IconButton>
      <Icon type="FontAwesome" name="rocket" />
    </IconButton>
  </View>
);

export const Text = () => (
  <View style={{ padding: 50 }}>
    <IconButton variant="contained" style={{ marginBottom: 20 }}>
      29
    </IconButton>
    <IconButton variant="outlined" style={{ marginBottom: 20 }}>
      29
    </IconButton>
    <IconButton variant="hovered">29</IconButton>
  </View>
);

export const Variants = () => (
  <View style={{ padding: 50 }}>
    <IconButton variant="contained" style={{ marginBottom: 20 }}>
      <Icon type="FontAwesome" name="rocket" />
    </IconButton>
    <IconButton variant="outlined" style={{ marginBottom: 20 }}>
      <Icon type="FontAwesome" name="rocket" />
    </IconButton>
    <IconButton variant="hovered">
      <Icon type="FontAwesome" name="rocket" />
    </IconButton>
  </View>
);

export const Disabled = () => (
  <View style={{ padding: 50 }}>
    <IconButton variant="contained" disabled style={{ marginBottom: 20 }}>
      <Icon type="FontAwesome" name="rocket" />
    </IconButton>
    <IconButton variant="outlined" disabled style={{ marginBottom: 20 }}>
      <Icon type="FontAwesome" name="rocket" />
    </IconButton>
    <IconButton variant="hovered" disabled>
      <Icon type="FontAwesome" name="rocket" />
    </IconButton>
  </View>
);

export const Loading = () => (
  <View style={{ padding: 50 }}>
    <IconButton variant="contained" loading style={{ marginBottom: 20 }}>
      <Icon type="FontAwesome" name="rocket" />
    </IconButton>
    <IconButton variant="outlined" loading style={{ marginBottom: 20 }}>
      <Icon type="FontAwesome" name="rocket" />
    </IconButton>
    <IconButton variant="hovered" loading>
      <Icon type="FontAwesome" name="rocket" />
    </IconButton>
  </View>
);

export const Size = () => (
  <View style={{ padding: 50 }}>
    <IconButton size="small" color="error" style={{ marginBottom: 20 }}>
      <Icon type="FontAwesome" name="rocket" />
    </IconButton>
    <IconButton size="medium" style={{ marginBottom: 20 }}>
      <Icon type="FontAwesome" name="rocket" />
    </IconButton>
    <IconButton size="large">
      <Icon type="FontAwesome" name="rocket" />
    </IconButton>
  </View>
);
