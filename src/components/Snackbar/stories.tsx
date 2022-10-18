import React from "react";
import { View } from "react-native";
import { Snackbar } from "./index";
import { Button } from "../Button";
import { useSnackbar } from "../../hooks/useSnackbar";
import { Icon } from "../Icon";

export default {
  component: Snackbar,
  title: "Snackbar",
};

export const Base = () => {
  const { enqueueSnackbar } = useSnackbar();

  return (
    <View style={{ padding: 20, flexDirection: "row", flexWrap: "wrap" }}>
      <Button
        style={{ marginRight: 5 }}
        onPress={() =>
          enqueueSnackbar({
            force: true,
            position: "center",
            message: "Je suis une success snackbar",
            color: "success",
          })
        }
      >
        CENTER
      </Button>
      <Button
        style={{ marginRight: 5 }}
        onPress={() =>
          enqueueSnackbar({
            force: true,
            position: "right",
            message: "Je suis une success snackbar",
            color: "success",
          })
        }
      >
        RIGHT
      </Button>
      <Button
        color="success"
        style={{ marginRight: 5 }}
        onPress={() =>
          enqueueSnackbar({
            force: true,
            message: "Je suis une success snackbar",
            color: "success",
          })
        }
      >
        Open success snackbars
      </Button>
      <Button
        color="info"
        style={{ marginRight: 5 }}
        onPress={() =>
          enqueueSnackbar({
            force: true,
            message: "Je suis une info snackbar",
            color: "info",
          })
        }
      >
        Open info snackbars
      </Button>
      <Button
        color="warning"
        style={{ marginRight: 5 }}
        onPress={() =>
          enqueueSnackbar({
            force: true,
            message: "Je suis une warning snackbar",
            color: "warning",
          })
        }
      >
        Open warning snackbars
      </Button>
      <Button
        color="error"
        style={{ marginRight: 5 }}
        onPress={() =>
          enqueueSnackbar({
            force: true,
            message: "Je suis une error snackbar",
            color: "error",
          })
        }
      >
        Open error snackbars
      </Button>
      <Button
        color="#000"
        style={{ marginRight: 5 }}
        onPress={() =>
          enqueueSnackbar({
            force: true,
            message: "Je suis une custom icon snackbar",
            icon: <Icon type="FontAwesome" name="rocket" />,
          })
        }
      >
        Open custom icon snackbars
      </Button>
    </View>
  );
};
