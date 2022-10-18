import { Button } from "../Button";
import React, { useState } from "react";
import { View } from "react-native";
import { Icon } from "../Icon";
import { Avatar } from "./index";

export default {
  component: Avatar,
  title: "Avatar",
};

export const UpdateTest = () => {
  const [value, setValue] = useState<string>();

  const onChange = () => {
    if (value) {
      setValue(undefined);
    } else {
      setValue(
        "https://resize.elle.fr/article/var/plain_site/storage/images/loisirs/cinema/news/avatar-2-une-premiere-bande-annonce-en-mai-4010741/96462268-1-fre-FR/Avatar-2-une-premiere-bande-annonce-en-mai.jpg"
      );
    }
  };

  return (
    <View style={{ padding: 50 }}>
      <Avatar src={value}>Yannis Caussade</Avatar>
      <Button onPress={onChange}>Update</Button>
    </View>
  );
};

export const Base = () => (
  <View style={{ padding: 50 }}>
    <Avatar>Yannis Caussade</Avatar>
  </View>
);

export const WithIcon = () => (
  <View style={{ padding: 50 }}>
    <Avatar>
      <Icon type="FontAwesome" name="rocket" color="#FFF" />
    </Avatar>
  </View>
);

export const Image = () => (
  <View style={{ padding: 50 }}>
    <Avatar src="https://resize.elle.fr/article/var/plain_site/storage/images/loisirs/cinema/news/avatar-2-une-premiere-bande-annonce-en-mai-4010741/96462268-1-fre-FR/Avatar-2-une-premiere-bande-annonce-en-mai.jpg">
      Yannis Caussade
    </Avatar>
  </View>
);

export const isOnline = () => (
  <View style={{ padding: 50 }}>
    <Avatar
      variant="circular"
      isOnline
      src="https://resize.elle.fr/article/var/plain_site/storage/images/loisirs/cinema/news/avatar-2-une-premiere-bande-annonce-en-mai-4010741/96462268-1-fre-FR/Avatar-2-une-premiere-bande-annonce-en-mai.jpg"
    >
      Yannis Caussade
    </Avatar>
  </View>
);

export const Size = () => (
  <View style={{ padding: 50 }}>
    <Avatar size={100}>Yannis Caussade</Avatar>
  </View>
);

export const Rounded = () => (
  <View style={{ padding: 50 }}>
    <Avatar
      variant="rounded"
      src="https://resize.elle.fr/article/var/plain_site/storage/images/loisirs/cinema/news/avatar-2-une-premiere-bande-annonce-en-mai-4010741/96462268-1-fre-FR/Avatar-2-une-premiere-bande-annonce-en-mai.jpg"
    >
      Yannis Caussade
    </Avatar>
  </View>
);

export const Square = () => (
  <View style={{ padding: 50 }}>
    <Avatar
      variant="square"
      src="https://resize.elle.fr/article/var/plain_site/storage/images/loisirs/cinema/news/avatar-2-une-premiere-bande-annonce-en-mai-4010741/96462268-1-fre-FR/Avatar-2-une-premiere-bande-annonce-en-mai.jpg"
    >
      Yannis Caussade
    </Avatar>
  </View>
);
