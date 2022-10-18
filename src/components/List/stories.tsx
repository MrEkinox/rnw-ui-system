import { Icon } from "../Icon";
import { Avatar } from "../Avatar";
import React from "react";
import { View } from "react-native";
import { List } from "./index";
import { ListItem } from "./ListItem";
import { Switch } from "../Switch";
import { ListItemText } from "./ListItemText";
import { ListItemIcon } from "./ListItemIcon";
import { ListItemAction } from "./ListItemAction";

export default {
  component: List,
  title: "List",
};

export const Base = () => (
  <View style={{ padding: 50 }}>
    <List header="Je suis un header" footer="Je suis un footer">
      <ListItem>
        <ListItemIcon>
          <Avatar src="https://resize.elle.fr/article/var/plain_site/storage/images/loisirs/cinema/news/avatar-2-une-premiere-bande-annonce-en-mai-4010741/96462268-1-fre-FR/Avatar-2-une-premiere-bande-annonce-en-mai.jpg">
            Yannis Caussade
          </Avatar>
        </ListItemIcon>
        <ListItemText
          primary="Brunch this weekend?"
          secondary="Ali Connors — I'll be in your neighborhood doing errands this…"
        />
      </ListItem>
    </List>
  </View>
);

export const SwitchList = () => (
  <View style={{ padding: 50 }}>
    <List header="Je suis un header" footer="Je suis un footer">
      <ListItem>
        <ListItemIcon>
          <Avatar>
            <Icon type="FontAwesome" name="wifi" color="#FFF" />
          </Avatar>
        </ListItemIcon>
        <ListItemText primary="WIFI" />
        <ListItemAction>
          <Switch />
        </ListItemAction>
      </ListItem>
    </List>
  </View>
);
