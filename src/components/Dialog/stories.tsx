import React, { useState } from "react";
import { View } from "react-native";
import { Typography } from "../Typography";
import { TextField } from "../TextField";
import { Button } from "../Button";
import { Dialog } from "./index";

export default {
  component: Dialog,
  title: "Dialog",
};

export const Base = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <View style={{ padding: 50 }}>
      <Button onPress={() => setIsOpen(true)}>Open Dialog</Button>
      <Dialog open={isOpen} onClose={() => setIsOpen(false)}>
        <Typography variant="h6">Titre</Typography>
        <Typography variant="subtitle1" style={{ marginBottom: 20 }}>
          Subtitle
        </Typography>

        <TextField label="Nom de l'album" />

        <Button onPress={() => setIsOpen(false)} style={{ marginTop: 20 }}>
          Créer
        </Button>
      </Dialog>
    </View>
  );
};
