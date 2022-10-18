import { Button } from "../Button";
import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { Typography } from "./index";

export default {
  component: Typography,
  title: "Typography",
};

export const Base = () => (
  <View>
    <Typography variant="h1" gutterBottom>
      h1. Heading
    </Typography>
    <Typography variant="h2" gutterBottom>
      h2. Heading
    </Typography>
    <Typography variant="h3" gutterBottom>
      h3. Heading
    </Typography>
    <Typography variant="h4" gutterBottom>
      h4. Heading
    </Typography>
    <Typography variant="h5" gutterBottom>
      h5. Heading
    </Typography>
    <Typography variant="h6" gutterBottom>
      h6. Heading
    </Typography>
    <Typography variant="subtitle1" gutterBottom>
      subtitle1. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos
      blanditiis tenetur
    </Typography>
    <Typography variant="subtitle2" gutterBottom>
      subtitle2. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos
      blanditiis tenetur
    </Typography>
    <Typography variant="body1" gutterBottom>
      body1. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos
      blanditiis tenetur unde suscipit, quam beatae rerum inventore consectetur,
      neque doloribus, cupiditate numquam dignissimos laborum fugiat deleniti?
      Eum quasi quidem quibusdam.
    </Typography>
    <Typography variant="body2" gutterBottom>
      body2. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos
      blanditiis tenetur unde suscipit, quam beatae rerum inventore consectetur,
      neque doloribus, cupiditate numquam dignissimos laborum fugiat deleniti?
      Eum quasi quidem quibusdam.
    </Typography>
    <Typography variant="button" gutterBottom>
      button text
    </Typography>
    <Typography variant="caption" gutterBottom>
      caption text
    </Typography>
    <Typography variant="overline" gutterBottom>
      overline text
    </Typography>
  </View>
);

export const Skeleton = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 2000);
  }, []);

  return (
    <Typography variant="h6" gutterBottom loading={loading} defaultWidth={200}>
      {loading ? "" : "Text"}
    </Typography>
  );
};

export const Vertical = () => {
  return (
    <Typography align="center" variant="h6" vertical>
      {"Textasajsiaushaushauhsauhsuahsa"}
    </Typography>
  );
};

export const UpdateTest = () => {
  const [value, setValue] = useState(false);

  const onChange = () => {
    setValue(!value);
  };

  return (
    <View style={{ padding: 50 }}>
      <Typography variant="h6">Test</Typography>
      <Button onPress={onChange}>Update</Button>
    </View>
  );
};
